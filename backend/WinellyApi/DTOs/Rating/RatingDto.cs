namespace WinellyApi.DTOs.Rating
{
    public class RatingDto
    {
        public int Id { get; set; }
        public decimal Score { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedByEmail { get; set; }
        public int WineId { get; set; }
    }
}
