using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using WinellyApi.Data;
using WinellyApi.DTOs.Wine;
using WinellyApi.DTOs.Winery;
using WinellyApi.Mappers;
using WinellyApi.Models;

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
                return NotFound("Invalid WineId.");
            }
            return Ok(wine.ToWineDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateWine(CreateWineRequestDto wineDto)
        {
            if (await _context.Wineries.FirstOrDefaultAsync(x => x.Id == wineDto.WineryId) == null)
            {
                return BadRequest("Invalid WineryId.");
            }

            var wineModel = wineDto.ToWineFromCreateDTO();
            await _context.Wines.AddAsync(wineModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWineById), new { id = wineModel.Id },  wineModel.ToWineDtoWithoutGrapes());
        }

 

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateWine([FromRoute] int id, UpdateWineRequestDto updateDto)
        {
            var wineModel = await _context.Wines.Include(x => x.Wine_GrapeConnections).ThenInclude(x => x.Grape).FirstOrDefaultAsync(x => x.Id == id);
            if(wineModel == null)
            {
                return NotFound();
            }

            wineModel.Name = updateDto.Name;
            wineModel.Type = updateDto.Type;
            wineModel.Description = updateDto.Description;
            wineModel.Taste = updateDto.Taste;
            wineModel.Year = updateDto.Year;
            wineModel.Price = updateDto.Price;
            wineModel.AlcoholContent = updateDto.AlcoholContent;
            
            wineModel.Wine_GrapeConnections.Clear();
            foreach (var grapeId in updateDto.GrapeIds)
            {
                wineModel.Wine_GrapeConnections.Add(
                    new Wine_GrapeConnection
                    {
                        WineId = id,
                        GrapeId = grapeId
                    });
            }

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
                return NotFound("Wine doesn't exist");
            }

            _context.Wines.Remove(wineModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
