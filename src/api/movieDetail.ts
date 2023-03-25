import { PATH } from "../constants/path";
import { Validator } from "./Validator";

export const getMovieDetail = async (movieId: number) => {
  try {
    const response = await fetch(
      `${PATH.BASE_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`
    );
    if (!Validator.status(response.status)) {
      throw new Error(`${response.json}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch ({ message }) {
    throw message;
  }
};
