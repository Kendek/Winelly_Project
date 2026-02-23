using WinellyApi.Models;
using System.Collections.Generic;

namespace WinellyApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user, IEnumerable<string> roles);
        string CreateRefreshToken();
        string HashToken(string token);
    }
}
