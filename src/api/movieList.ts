import { ErrorComment } from "../components/ErrorComment";
import { PATH } from "../constants/path";
import { Validator } from "./Validator";

export const getMovieData = async (page: number) => {
  try {
    const response = await fetch(
      `${PATH.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${page}`
    );
    if (!Validator.status(response.status)) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch ({ message }) {
    const errorComment = new ErrorComment(Number(message));
    errorComment.render();
  }
};
