using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Data;
using WinellyApi.DTOs.Wine;
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
            var wines = _context.Wines.ToList()
                .Select(wine => wine.ToWineDto());
            return Ok(wines);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWineById(int id)
        {
            var wine = _context.Wines.Find(id);
            if (wine == null)
            {
                return NotFound();
            }
            return Ok(wine.ToWineDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateWineRequestDto wineDto)
        {
            var winery = await _context.Wineries.FindAsync(wineDto.WineryId);
            if (winery == null) return BadRequest("Invalid WineryId.");

            var wineModel = wineDto.ToWineFromCreateDTO();
            wineModel.Winery = winery;
            _context.Wines.Add(wineModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWineById), new { id = wineModel.Id }, wineModel.ToWineDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateWineRequestDto updateDto)
        {
            var wineModel = await _context.Wines.FirstOrDefaultAsync(x => x.Id == id);
            if(wineModel == null)
            {
                return NotFound();
            }

            wineModel.Name = updateDto.Name;
            wineModel.Type = updateDto.Type;
            wineModel.Year = updateDto.Year;
            wineModel.Price = updateDto.Price;
            wineModel.AlcoholContent = updateDto.AlcoholContent;
            wineModel.WineryId = updateDto.WineryId;

            await _context.SaveChangesAsync();

            return Ok(wineModel.ToWineDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var wineModel = _context.Wines.FirstOrDefault(x => x.Id == id);
            if(wineModel == null)
            {
                return NotFound();
            }

            _context.Wines.Remove(wineModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
