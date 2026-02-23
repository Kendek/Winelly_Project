using System.Net.Http;
using System.Text.Json;
using WinellyApi.Interfaces;
using System.Linq;

namespace WinellyApi.Services.GeoServices
{
    public class GeoService : IGeoService
    {
        private readonly HttpClient _httpClient;
        public GeoService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<GeoResultDto?> GetCoordinatesAsync(string city)
        {
            var response = await _httpClient.GetAsync($"https://api.geoapify.com/v1/geocode/search?text={city}&type=city&format=json&apiKey=73b7d62e46364bad80482a9b4e8747f8");
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var data = JsonSerializer.Deserialize<GeoResponse>(json, options);

            var firstResult = data?.Results?.FirstOrDefault();
            if (firstResult == null)
            {
                return new GeoResultDto
                {
                    Lat = 0,
                    Lon = 0
                };
            }

            return new GeoResultDto
            {
                Lat = firstResult.Lat,
                Lon = firstResult.Lon
            };
        }
    }
}
