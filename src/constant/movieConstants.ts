import { Constant, State } from "../type/movieType";

export const ImgSrc: Readonly<Constant> = {
  NO_IMG: "./image/no_image.jpg",
  FULL_STAR: "./image/star_filled.png",
  EMPTY_STAR: "./image/star_empty.png",
};

export const RATE_RANGE: number = 2;

export const RateCaption: Readonly<Constant> = {
  "1": "최악이예요",
  "2": "별로예요",
  "3": "보통이에요",
  "4": "재미있어요",
  "5": "명작이에요",
};

export const USER_RATE_STORAGE_KEY: string = "user_rate";

export const apiStatus: Readonly<Constant> = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};
