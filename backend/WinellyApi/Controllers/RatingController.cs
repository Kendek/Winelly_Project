using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Data;
using WinellyApi.Models;
using WinellyApi.Mappers;
using WinellyApi.DTOs.Rating;
using Microsoft.AspNetCore.Authorization;

namespace WinellyApi.Controllers
{
    [Route("api/rating")]
    [ApiController]
    public class RatingController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        public RatingController(ApplicationDbContext context, UserManager<AppUser> user)
        {
            _context = context;
            _userManager = user;
        }

        [HttpGet("{wineId}")]
        public async Task<IActionResult> GetRatingsById(int wineId)
        {
            var wine = await _context.Wines.FirstOrDefaultAsync(x => x.Id == wineId);

            if (wine == null) return NotFound("Invalid wineId");

            var ratings = _context.Ratings.Include(x => x.AppUser).Where(x => x.WineId == wineId);
            var ratingsDto = ratings.Select(x => x.ToRatingDto());
            return Ok(ratingsDto);
        }

        [HttpPost]
        [Route("{wineId}")]
        [Authorize]
        public async Task<IActionResult> AddRatingToWine([FromRoute] int wineId, CreateRatingRequestDto ratingDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var ratingModel = ratingDto.ToRatingFromCreate(wineId);
            ratingModel.AppUserId = user.Id;
            ratingModel.CreatedOn = DateTime.Now;
            await _context.Ratings.AddAsync(ratingModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRatingsById), new { wineId = ratingModel.WineId }, ratingModel.ToRatingDto());
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var ratingModel = await _context.Ratings.FirstOrDefaultAsync(x => x.Id == id);
            if (ratingModel == null) return NotFound("Invalid id.");

            if (!User.IsInRole("Admin"))
            {
                if (ratingModel.AppUser.Id != user.Id) return Unauthorized();
            }
            
            _context.Ratings.Remove(ratingModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
}
