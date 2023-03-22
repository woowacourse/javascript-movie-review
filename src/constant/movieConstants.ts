import { Constant } from "../type/movieType";

export const ImgSrc: Readonly<Constant> = {
  NO_IMG: "./image/no_image.jpg",
  FULL_STAR: "./image/star_filled.png",
  EMPTY_STAR: "./image/star_empty.png",
};

export const RATE_RANGE: number = 2;

export const RateCaption: Readonly<Constant> = {
  "1": "별로에요",
  "2": "그저 그래요",
  "3": "괜찮아요",
  "4": "좋아요",
  "5": "훌륭해요",
};

export const STORAGE_KEY: string = "user_rate";
