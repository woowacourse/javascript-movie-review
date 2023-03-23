import { ErrorComment } from "../components/ErrorComment";
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
    return data;
  } catch ({ message }) {
    const errorComment = new ErrorComment(Number(message));
    errorComment.render();
  }
};
