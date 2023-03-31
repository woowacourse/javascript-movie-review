import type { MovieDetail, MovieDetailResponse } from "../types";

import { State } from "../components/MovieList";

interface UrlParam {
  state?: State;
  movieId?: number;
}

const API_END_POINT = "https://api.themoviedb.org/3";

export const request = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}`);
  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      alert("네트워크 연결이 종료되었습니다.");
      return;
    }

    switch (error.message.slice(0, 1)) {
      case "4":
        alert("잘못된 요청입니다!");
        break;
      case "5":
        alert("서버에서 오류가 발생했습니다.");
        break;
    }
  }
};

export const getURL = (urlParam: UrlParam) => {
  if (urlParam.movieId)
    return `${API_END_POINT}/movie/${urlParam.movieId}?api_key=${process.env.API_KEY}&language=ko`;

  if (urlParam.state) {
    if (urlParam.state.showState === "popular")
      return `${API_END_POINT}/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${urlParam.state.page}`;
    if (urlParam.state.showState === "search")
      return `${API_END_POINT}/search/movie?api_key=${
        process.env.API_KEY
      }&language=ko&page=${urlParam.state.page}&query=${encodeURI(
        urlParam.state.searchKeyword
      )}`;
  }

  throw new Error("url을 만들기 위한 올바른 인자값이 전달되지 않았습니다.");
};

export const convertMovieDetail = (
  movieDetail: MovieDetailResponse
): MovieDetail => {
  return {
    id: movieDetail.id,
    poster_path: movieDetail.poster_path,
    title: movieDetail.title,
    vote_average: movieDetail.vote_average,
    genre: movieDetail.genres.map((data) => data.name),
    overview: movieDetail.overview,
  };
};
