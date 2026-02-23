using WinellyApi.DTOs.Grape;
using WinellyApi.DTOs.Wine;
using WinellyApi.Models;

namespace WinellyApi.Mappers
{
    public static class GrapeMapper
    {
        public static GrapeDto ToGrapeDto(this Grape grapeModel)
        {
            return new GrapeDto
            {
                Id = grapeModel.Id,
                Name = grapeModel.Name,
                Color = grapeModel.Color,
            };
        }

        public static Grape ToGrapeFromCreateDto(this CreateGrapeRequestDto grapeDto)
        {
            return new Grape
            {
                Name = grapeDto.Name,
                Color = grapeDto.Color,
            };
        }
    }
}
