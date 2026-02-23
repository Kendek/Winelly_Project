using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WinellyApi.Data;
using WinellyApi.DTOs.Admin;
using WinellyApi.Mappers;
using WinellyApi.Models;

namespace WinellyApi.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _context;
        public AdminController(UserManager<AppUser> userManger, ApplicationDbContext context)
        {
            _userManager = userManger;
            _context = context;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync("User");
            if (usersInRole == null) return NotFound();

            var usersDto = usersInRole
                .Where(u => !u.IsDeleted)
                .Select(user => user.ToGetUsersDto());

            return Ok(usersDto);
        }

        [HttpDelete]
        [Route("deleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("Invalid userId");

            if (user.IsDeleted) return NoContent();

            user.IsDeleted = true;
            user.DeletedOn = DateTime.UtcNow;

            user.LockoutEnabled = true;
            user.LockoutEnd = DateTimeOffset.MaxValue;

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                var errors = string.Join("; ", updateResult.Errors.Select(e => e.Description));
                return StatusCode(500, $"Failed to soft-delete user: {errors}");
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
