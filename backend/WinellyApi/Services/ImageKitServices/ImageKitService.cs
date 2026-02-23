using Imagekit.Sdk;
using Microsoft.AspNetCore.Http;
using WinellyApi.Interfaces;

namespace WinellyApi.Services.ImageKitServices
{
    public class ImageKitService : IImageKitService
    {
        private readonly ImagekitClient _imageKit;

        public ImageKitService(ImagekitClient imageKit)
        {
            _imageKit = imageKit;
        }

        public async Task<UploadImageDto> UploadImage(IFormFile file)
        {
            using var stream = file.OpenReadStream();
            using var ms = new MemoryStream();
            await stream.CopyToAsync(ms);

            var uploadRequest = new FileCreateRequest
            {
                file = ms.ToArray(),
                fileName = file.FileName,
                folder = "/Winelly",
                useUniqueFileName = true
            };

            var result = _imageKit.Upload(uploadRequest);

            if (result == null)
                return new UploadImageDto
                {
                    Url = null,
                    FileId = null    
                };

            return new UploadImageDto
            {
                Url = result.url,
                FileId = result.fileId
            };
        }

        public async Task<bool> DeleteImage(string fileId)
        {
            if (string.IsNullOrWhiteSpace(fileId))
                return false;

            var result = _imageKit.DeleteFile(fileId);

            if (result == null)
                return false;

            return true;
        }
    }
}
