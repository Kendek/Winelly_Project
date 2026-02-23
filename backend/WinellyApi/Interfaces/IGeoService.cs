using System.Threading.Tasks;
using WinellyApi.Services.GeoServices;

namespace WinellyApi.Interfaces
{
    public interface IGeoService
    {
        Task<GeoResultDto?> GetCoordinatesAsync(string city);
    }
}
