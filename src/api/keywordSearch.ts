import { ErrorComment } from "../components/ErrorComment";
import { Validator } from "./Validator";

export const getKeywordData = async (page: number, keyword: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${page}`
    );
    if (!Validator.status(response.status)) {
      throw Error(`${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch ({ message }) {
    const errorComment = new ErrorComment(Number(message));
    errorComment.render();
  }
};
