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
    //[Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _context;
        public AdminController(UserManager<AppUser> userManger, ApplicationDbContext context)
        {
            _userManager = userManger;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.GetUsersInRoleAsync("User");
            if (users == null) return NotFound();
            var usersDto = users.Select(user => user.ToGetUsersDto());
            return Ok(usersDto);
        }
        /*
        [HttpDelete]
        [Route("{userId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string userId)
        {
            //var isAdmin = await _userManager.GetUserAsync(User);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("Invalid userId");

            await _userManager.DeleteAsync(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        */
    }
}
