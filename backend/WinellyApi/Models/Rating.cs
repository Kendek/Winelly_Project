using System.ComponentModel.DataAnnotations.Schema;

namespace WinellyApi.Models
{
    [Table("Ratings")]
    public class Rating
    {
        public int Id { get; set; }
        public decimal Score { get; set; }
        public string Content { get; set; }
        public DateTime CreatedOn { get; set; }
        public int WineId { get; set; }
        public Wine Wine { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
