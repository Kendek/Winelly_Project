using System.ComponentModel.DataAnnotations.Schema;

namespace WinellyApi.Models
{
    [Table("Wine_GrapeConnections")]
    public class Wine_GrapeConnection
    {
        public int WineId { get; set; }
        public int  GrapeId { get; set; }
        public Wine Wine { get; set; }
        public Grape Grape { get; set; }
    }
}
