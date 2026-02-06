using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace WinellyApi.Models
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedOn { get; set; }
    }
}
