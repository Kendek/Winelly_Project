using WinellyApi.DTOs.Grape;
using WinellyApi.DTOs.Rating;
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
                Description = wineModel.Description,
                Taste = wineModel.Taste,
                Year = wineModel.Year,
                Price = wineModel.Price,
                AlcoholContent = wineModel.AlcoholContent,
                Url = wineModel.Url,
                FileId = wineModel.FileId,
                WineryId = wineModel.WineryId,
                Grapes = wineModel.Wine_GrapeConnections
                    .Select(x => new GrapeDto
                    {
                        Id = x.Grape.Id,
                        Name = x.Grape.Name,
                        Color = x.Grape.Color,
                    })
                    .ToList(),
                Ratings = wineModel.Ratings
                    .Select(x => new RatingDto
                    {
                        Id = x.Id,
                        Score = x.Score,
                        Content = x.Content,
                        CreatedOn = x.CreatedOn,
                        CreatedBy = x.AppUser.FirstName,
                        CreatedByEmail = x.AppUser.Email,
                        WineId = x.WineId,
                    })
                    .ToList()
            };
        }
        public static WineDto ToWineDtoWithoutGrapes(this Wine wineModel)
        {
            return new WineDto
            {
                Id = wineModel.Id,
                Name = wineModel.Name,
                Type = wineModel.Type,
                Description = wineModel.Description,
                Taste = wineModel.Taste,
                Year = wineModel.Year,
                Price = wineModel.Price,
                AlcoholContent = wineModel.AlcoholContent,
                Url = wineModel.Url,
                FileId = wineModel.FileId,
                WineryId = wineModel.WineryId,
            };
        }

        public static Wine ToWineFromCreateDTO(this CreateWineRequestDto wineDto)
        {
            var wine = new Wine
            {
                Name = wineDto.Name,
                Type = wineDto.Type,
                Description = wineDto.Description,
                Taste = wineDto.Taste,
                Year = wineDto.Year,
                Price = wineDto.Price,
                AlcoholContent = wineDto.AlcoholContent,
                WineryId = wineDto.WineryId,
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
    }
}
