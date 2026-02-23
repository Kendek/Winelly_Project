using WinellyApi.Services.ImageKitServices;

namespace WinellyApi.Interfaces
{
    public interface IImageKitService
    {
        Task<UploadImageDto> UploadImage(IFormFile file);
        Task<bool> DeleteImage(string fileId);
    }
}
