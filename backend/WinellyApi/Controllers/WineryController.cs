using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Data;
using WinellyApi.DTOs.Wine;
using WinellyApi.DTOs.Winery;
using WinellyApi.Interfaces;
using WinellyApi.Mappers;
using WinellyApi.Services.GeoServices;

namespace WinellyApi.Controllers
{
    [Route("api/winery")]
    [ApiController]
    public class WineryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IGeoService _geoService;
        public WineryController(ApplicationDbContext context, IGeoService geoService)
        {
            _context = context;
            _geoService = geoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetWineries()
        {
            var wineries = await _context.Wineries.Include(x => x.Wines).ToListAsync();
            var wineriesDto = wineries.Select(winery => winery.ToWineryDto());
            return Ok(wineriesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWineryById(int id)
        {
            var winery = await _context.Wineries.Include(x => x.Wines).FirstOrDefaultAsync(x => x.Id == id);
            if (winery == null)
            {
                return NotFound();
            }
            return Ok(winery.ToWineryDto());
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateWinery([FromBody] CreateWineryRequestDto wineryDto)
        {
            var geoRes = await _geoService.GetCoordinatesAsync(wineryDto.Region);
            var wineryModel = wineryDto.ToWineryFromCreateDTO(geoRes ?? new GeoResultDto{Lon = 0, Lat = 0});
            await _context.Wineries.AddAsync(wineryModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWineryById), new { id = wineryModel.Id }, wineryModel.ToWineryDto());
        }

        [HttpPatch]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateWinery([FromRoute] int id, UpdateWineryRequestDto updateDto)
        {
            var wineryModel = await _context.Wineries.FirstOrDefaultAsync(x => x.Id == id);
            if(wineryModel == null)
            {
                return NotFound();
            }

            if (updateDto.Name != null)  wineryModel.Name = updateDto.Name;
            if (updateDto.Region != null)
            {
                wineryModel.Region = updateDto.Region;
                var geoRes = await _geoService.GetCoordinatesAsync(updateDto.Region);
                wineryModel.Lat = geoRes.Lat;
                wineryModel.Lon = geoRes.Lon;
            }
            if (updateDto.Country != null) wineryModel.Country = updateDto.Country;
            if (updateDto.EstablishedYear != 0)  wineryModel.EstablishedYear = updateDto.EstablishedYear;

            await _context.SaveChangesAsync();
            return Ok(wineryModel.ToWineryDto());

        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteWinery([FromRoute] int id)
        {
            var wineryModel = await _context.Wineries.FirstOrDefaultAsync(x => x.Id == id);
            if(wineryModel == null)
            {
                return NotFound();
            }

            _context.Wineries.Remove(wineryModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
