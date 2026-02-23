using WinellyApi.DTOs.Winery;
using WinellyApi.Models;
using WinellyApi.Services.GeoServices;

namespace WinellyApi.Mappers
{
    public static class WineryMapper
    {
        public static WineryDto ToWineryDto(this Winery wineryModel)
        {
            return new WineryDto
            {
                Id = wineryModel.Id,
                Name = wineryModel.Name,
                Region = wineryModel.Region,
                Country = wineryModel.Country,
                Lat = wineryModel.Lat,
                Lon = wineryModel.Lon,
                EstablishedYear = wineryModel.EstablishedYear,
                Wines = wineryModel.Wines.Select(w => w.ToWineDto()).ToList(),
            };
        }

        public static Winery ToWineryFromCreateDTO(this CreateWineryRequestDto wineryDto, GeoResultDto geoRes)
        {
            return new Winery
            {
                Name = wineryDto.Name,
                Region = wineryDto.Region,
                Country = wineryDto.Country,
                Lat = geoRes.Lat,
                Lon = geoRes.Lon,
                EstablishedYear = wineryDto.EstablishedYear,
            };
        }
    }
}
