import { URL } from './constant';

export const getOriginalImageUrl = (src: string): string => {
  return URL.ORIGINAL_IMAGE + src;
};

export const getThumbnailImageUrl = (src: string): string => {
  return URL.THUMBNAIL_IMAGE + src;
};
