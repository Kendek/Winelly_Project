using WinellyApi.DTOs.Rating;
using WinellyApi.Models;

namespace WinellyApi.Mappers
{
    public static class RatingMapper
    {
        public static RatingDto ToRatingDto(this Rating ratingModel)
        {
            return new RatingDto
            {
                Id = ratingModel.Id,
                Score = ratingModel.Score,
                Content = ratingModel.Content,
                CreatedOn = ratingModel.CreatedOn,
                CreatedBy = ratingModel.AppUser.FirstName,
                CreatedByEmail = ratingModel.AppUser.Email,
                WineId = ratingModel.WineId,
            };
        }

        public static Rating ToRatingFromCreate(this CreateRatingRequestDto  ratingDto, int wineId)
        {
            return new Rating
            {
                Score = ratingDto.Score,
                Content = ratingDto.Content,
                WineId = wineId
            };
        }
    }
}
