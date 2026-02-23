using WinellyApi.DTOs.Wine;

namespace WinellyApi.DTOs.Winery
{
    public class WineryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public int EstablishedYear { get; set; }
        public List<WineDto> Wines { get; set; }
    }
}
