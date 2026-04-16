import { IMAGE_URL } from "../constants/constant";

export const createImageUrl = (baseUrl: string, imageUrlPath: string) => {
  return imageUrlPath.length > 0 ? `${baseUrl}${imageUrlPath}` : IMAGE_URL.DEFAULT_THUMBNAIL_IMAGE_URL;
};

export const formatMovieRate = (rate: number) => {
  return (Math.round(rate * 10) / 10).toFixed(1);
};
