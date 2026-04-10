import { URL } from './constant';

const PLACEHOLDER = './images/empty.png';
export const getOriginalImageUrl = (src: string | null): string => {
  if (!src) return PLACEHOLDER;
  return URL.ORIGINAL_IMAGE + src;
};

export const getThumbnailImageUrl = (src: string): string => {
  if (!src) return PLACEHOLDER;
  return URL.THUMBNAIL_IMAGE + src;
};
