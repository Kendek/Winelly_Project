using WinellyApi.DTOs.Admin;
using WinellyApi.Models;

namespace WinellyApi.Mappers
{
    public static class AdminMapper
    {
        public static GetUsersDto ToGetUsersDto(this AppUser appUser)
        {
            return new GetUsersDto
            {
                Id = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Email = appUser.Email,
            };
        }
    }
}
