using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Data;
using WinellyApi.DTOs.Wine;
using WinellyApi.DTOs.Winery;
using WinellyApi.Mappers;

namespace WinellyApi.Controllers
{
    [Route("api/wine")]
    [ApiController]
    public class WineController : ControllerBase
    {
       private  readonly ApplicationDbContext _context;
        public WineController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWines()
        {
            var wines = await _context.Wines.Include(w => w.Wine_GrapeConnections).ThenInclude(wg => wg.Grape).ToListAsync();
            var winesDto = wines.Select(wine => wine.ToWineDto());
            return Ok(winesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWineById(int id)
        {
            var wine = await _context.Wines.Include(w => w.Wine_GrapeConnections).ThenInclude(wg => wg.Grape).FirstOrDefaultAsync(x => x.Id == id);
            if (wine == null)
            {
                return NotFound();
            }
            return Ok(wine.ToWineDto());
        }

        [HttpPost("{wineryId}")]
        public async Task<IActionResult> CreateWine([FromRoute] int wineryId, CreateWineRequestDto wineDto)
        {
            if (await _context.Wines.FirstOrDefaultAsync(x => x.Id == wineryId) == null)
            {
                return BadRequest("Invalid WineryId.");
            }

            var wineModel = wineDto.ToWineFromCreateDTO(wineryId);
            await _context.Wines.AddAsync(wineModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWineById), new { id = wineModel.Id }, wineModel.ToWineDto());
        }

 

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateWine([FromRoute] int id, UpdateWineRequestDto updateDto)
        {
            var wineModel = await _context.Wines.FirstOrDefaultAsync(x => x.Id == id);
            if(wineModel == null)
            {
                return NotFound();
            }

            wineModel = updateDto.ToWineFromUpdateDTO();

            await _context.SaveChangesAsync();

            return Ok(wineModel.ToWineDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteWine([FromRoute] int id)
        {
            var wineModel = await _context.Wines.FirstOrDefaultAsync(x => x.Id == id);
            if(wineModel == null)
            {
                return NotFound("Comment doesn't exist");
            }

            _context.Wines.Remove(wineModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
