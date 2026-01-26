using Microsoft.AspNetCore.Identity;

namespace WinellyApi.Models
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<Rating> Ratings { get; set; } = new List<Rating>();
    }
}
