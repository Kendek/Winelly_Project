using WinellyApi.DTOs.Grape;
using WinellyApi.DTOs.Wine;
using WinellyApi.Models;

namespace WinellyApi.Mappers
{
    public static class WineMapper
    {
        public static WineDto ToWineDto(this Wine wineModel)
        {
            return new WineDto
            {
                Id = wineModel.Id,
                Name = wineModel.Name,
                Type = wineModel.Type,
                Year = wineModel.Year,
                Price = wineModel.Price,
                AlcoholContent = wineModel.AlcoholContent,
                WineryId = wineModel.WineryId,
                Grapes = wineModel.Wine_GrapeConnections
                    .Select(x => new GrapeDto
                    {
                        Id = x.Grape.Id,
                        Name = x.Grape.Name,
                        Color = x.Grape.Color,
                        Taste = x.Grape.Taste,
                    })
                    .ToList()
            };
        }

        public static Wine ToWineFromCreateDTO(this CreateWineRequestDto wineDto, int wineryId)
        {
            var wine = new Wine
            {
                Name = wineDto.Name,
                Type = wineDto.Type,
                Year = wineDto.Year,
                Price = wineDto.Price,
                AlcoholContent = wineDto.AlcoholContent,
                WineryId = wineryId,
            };

            foreach(var grapeId in wineDto.GrapeIds)
            {
                wine.Wine_GrapeConnections.Add(
                    new Wine_GrapeConnection
                    {
                        GrapeId = grapeId,
                    });
            }

            return wine;

        }
        public static Wine ToWineFromUpdateDTO(this UpdateWineRequestDto wineDto)
        {
            return new Wine
            {
                Name = wineDto.Name,
                Type = wineDto.Type,
                Year = wineDto.Year,
                Price = wineDto.Price,
                AlcoholContent = wineDto.AlcoholContent,
            };
        }
    }
}
