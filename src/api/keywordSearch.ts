import { ErrorComment } from "../components/ErrorComment";
import { PATH } from "../constants/path";
import { Validator } from "./Validator";

export const getKeywordData = async (page: number, keyword: string) => {
  try {
    const response = await fetch(
      `${PATH.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${page}`
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
