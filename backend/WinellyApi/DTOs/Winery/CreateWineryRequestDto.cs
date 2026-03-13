namespace WinellyApi.DTOs.Winery
{
    public class CreateWineryRequestDto
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public int EstablishedYear { get; set; }
        public string Description { get; set; }
        public string MapUrl { get; set; }
    }
}
