using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.DTOs.Account;
using WinellyApi.Interfaces;
using WinellyApi.Models;
using Microsoft.AspNetCore.Http; // for CookieOptions
using System.Security.Claims;

namespace WinellyApi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signinManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signinManager = signInManager;
            _tokenService = tokenService;
        }

        private void SetRefreshTokenCookie(string token, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = expires,
                SameSite = SameSiteMode.None,
                Path = "/",
                // Domain = "valami" Ha a frontendnél error lesz ez a baj
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized("Invalid Email");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect.");

            var jwt = _tokenService.CreateToken(user);


            var rawRefresh = _tokenService.CreateRefreshToken();
            var hashed = _tokenService.HashToken(rawRefresh);
            var refreshEntity = new RefreshToken
            {
                TokenHash = hashed,
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7),
                CreatedByIp = HttpContext.Connection.RemoteIpAddress?.ToString()
            };

            user.RefreshTokens.Add(refreshEntity);
            await _userManager.UpdateAsync(user);


            SetRefreshTokenCookie(rawRefresh, refreshEntity.Expires);

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = jwt
                }
            );
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var rawToken) || string.IsNullOrWhiteSpace(rawToken))
                return Unauthorized("Refresh token not provided.");

            var tokenHash = _tokenService.HashToken(rawToken);

            var user = await _userManager.Users
                .Include(u => u.RefreshTokens)
                .SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.TokenHash == tokenHash));

            if (user == null)
                return Unauthorized("Invalid token.");

            var existingToken = user.RefreshTokens.Single(t => t.TokenHash == tokenHash);

            if (!existingToken.IsActive)
                return Unauthorized("Refresh token expired or revoked.");

            var newRaw = _tokenService.CreateRefreshToken();
            var newHash = _tokenService.HashToken(newRaw);

            existingToken.Revoked = DateTime.UtcNow;
            existingToken.RevokedByIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            existingToken.ReplacedByTokenHash = newHash;

            var newRefresh = new RefreshToken
            {
                TokenHash = newHash,
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7),
                CreatedByIp = HttpContext.Connection.RemoteIpAddress?.ToString()
            };

            user.RefreshTokens.Add(newRefresh);
            await _userManager.UpdateAsync(user);

            SetRefreshTokenCookie(newRaw, newRefresh.Expires);

            var newJwt = _tokenService.CreateToken(user);

            return Ok(new { Token = newJwt });
        }

        [HttpPost("revoke")]
        public async Task<IActionResult> Revoke() //Log Out
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var rawToken) || string.IsNullOrWhiteSpace(rawToken))
                return BadRequest("No token provided.");

            var tokenHash = _tokenService.HashToken(rawToken);

            var user = await _userManager.Users
                .Include(u => u.RefreshTokens)
                .SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.TokenHash == tokenHash));

            if (user == null)
                return NotFound();

            var token = user.RefreshTokens.Single(t => t.TokenHash == tokenHash);

            if (!token.IsActive)
                return BadRequest("Token already inactive.");

            token.Revoked = DateTime.UtcNow;
            token.RevokedByIp = HttpContext.Connection.RemoteIpAddress?.ToString();

            await _userManager.UpdateAsync(user);
            await _signinManager.SignOutAsync();

            Response.Cookies.Delete("refreshToken");

            return Ok("Token revoked");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);
                var appUser = new AppUser
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                };

                var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if(createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if(roleResult.Succeeded)
                    {
                        return Ok("User created");
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }

            }catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
