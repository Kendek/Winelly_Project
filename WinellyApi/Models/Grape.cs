using System.ComponentModel.DataAnnotations.Schema;

namespace WinellyApi.Models
{
    [Table("Grapes")]
    public class Grape
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public List<Wine_GrapeConnection> Wine_GrapeConnections { get; set; } = new();
    }
}
