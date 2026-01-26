namespace WinellyApi.DTOs.Rating
{
    public class CreateRatingRequestDto
    {
        public decimal Score { get; set; }
        public string Content { get; set; }  = string.Empty;
    }
}
