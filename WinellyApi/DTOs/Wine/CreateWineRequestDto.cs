using WinellyApi.Models;

namespace WinellyApi.DTOs.Wine
{
    public class CreateWineRequestDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public double AlcoholContent { get; set; }
        public List<int> GrapeIds { get; set; }
    }
}
