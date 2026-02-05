using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Data;
using WinellyApi.DTOs.Wine;
using WinellyApi.Interfaces;
using WinellyApi.Mappers;
using WinellyApi.Models;

namespace WinellyApi.Controllers
{
    [Route("api/wine")]
    [ApiController]
    public class WineController : ControllerBase
    {
        private  readonly ApplicationDbContext _context;
        private readonly IImageKitService _imageKit;
        public WineController(ApplicationDbContext context, IImageKitService imageKit)
        {
            _context = context;
            _imageKit = imageKit;
        }

        [HttpGet]
        public async Task<IActionResult> GetWines()
        {
            var wines = await _context.Wines.Include(w => w.Wine_GrapeConnections).ThenInclude(wg => wg.Grape).Include(x => x.Ratings).ThenInclude(x => x.AppUser).ToListAsync();
            var winesDto = wines.Select(wine => wine.ToWineDto());
            return Ok(winesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWineById(int id)
        {
            var wine = await _context.Wines.Include(w => w.Wine_GrapeConnections).ThenInclude(wg => wg.Grape).Include(x => x.Ratings).ThenInclude(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            if (wine == null)
            {
                return NotFound("Invalid WineId.");
            }
            return Ok(wine.ToWineDto());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateWine([FromForm] CreateWineRequestDto wineDto)
        {
            if (await _context.Wineries.FirstOrDefaultAsync(x => x.Id == wineDto.WineryId) == null)
            {
                return BadRequest("Invalid WineryId.");
            }

            if (wineDto.File == null)
            {
                return BadRequest("No file provided.");
            }

            var fileData = await _imageKit.UploadImage(wineDto.File);

            if (fileData == null || string.IsNullOrEmpty(fileData.Url))
            {
                return StatusCode(500, "Image upload failed.");
            }

            var wineModel = wineDto.ToWineFromCreateDTO();
            wineModel.Url = fileData.Url;
            wineModel.FileId = fileData.FileId;
            await _context.Wines.AddAsync(wineModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWineById), new { id = wineModel.Id },  wineModel.ToWineDtoWithoutGrapes());
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteWine([FromRoute] int id)
        {
            var wineModel = await _context.Wines.FirstOrDefaultAsync(x => x.Id == id);
            if(wineModel == null)
            {
                return NotFound("Wine doesn't exist");
            }

            var imgRes =  await _imageKit.DeleteImage(wineModel.FileId ?? "");

            if (imgRes == false)
            {
                return BadRequest("Error with the image delet service");
            }

            _context.Wines.Remove(wineModel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
