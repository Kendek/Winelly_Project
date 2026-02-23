using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Data;
using WinellyApi.DTOs.Grape;
using WinellyApi.Mappers;

namespace WinellyApi.Controllers
{
    [Route("api/grape")]
    [ApiController]
    public class GrapeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GrapeController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetGrapes()
        {
            var grapes = await _context.Grapes.Include(x => x.Wine_GrapeConnections).ThenInclude(x => x.Wine).ToListAsync();
            var grapesDto = grapes.Select(x => x.ToGrapeDto());

            return Ok(grapesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrapeById(int id)
        {
            var grape = await _context.Grapes.Include(x => x.Wine_GrapeConnections).ThenInclude(x => x.Wine).FirstOrDefaultAsync(x => x.Id == id);
            if(grape == null)
            {
                return NotFound("Invalid GrapeId");
            }
            return Ok(grape.ToGrapeDto());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateGrape([FromBody] CreateGrapeRequestDto grapeDto)
        {
            var grapeModel = grapeDto.ToGrapeFromCreateDto();
            await _context.AddAsync(grapeModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGrapeById), new { id = grapeModel.Id }, grapeModel.ToGrapeDto());
        }

        //[HttpPut]


        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteGrapeById([FromRoute]int id)
        {
            var grape = await _context.Grapes.Include(x => x.Wine_GrapeConnections).FirstOrDefaultAsync(x => x.Id == id);
            if(grape == null)
            {
                return NotFound("Grape doesn't exist");
            }
            _context.Grapes.Remove(grape);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
