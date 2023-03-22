import { ACTION, REQUEST_URL } from "../constants/constants";
import { API_KEY } from "../constants/key";

export const urlByActionType = (actionType, payload) => {
  switch (actionType) {
    case ACTION.POPULAR:
      return `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${payload.nextPage}`;
    case ACTION.SEARCH:
      return `${REQUEST_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${payload.query}&page=${payload.nextPage}&include_adult=false`;
  }
};
