using System.ComponentModel.DataAnnotations.Schema;

namespace WinellyApi.Models
{
    [Table("Wines")]
    public class Wine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Taste { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public double AlcoholContent { get; set; }
        public string? Url { get; set; }
        public string? FileId { get; set; }
        public int WineryId { get; set; }
        public Winery Winery { get; set; }
        public List<Rating> Ratings { get; set; } = new();
        public List<Wine_GrapeConnection> Wine_GrapeConnections { get; set; } = new();
    }
}
