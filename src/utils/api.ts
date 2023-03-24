import { MovieDetail, MovieDetailResponse } from "../types";

const API_END_POINT = "https://api.themoviedb.org/3";

const request = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}`);
  } catch (error: any) {
    if (error.message === "Failed to fatch")
      return alert("네트워크 연결이 종료되었습니다.");
    alert(`${error.message} 에러가 발생했습니다!`);
  }
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

export const fetchPopularMovies = (page: number) => {
  const url = `${API_END_POINT}/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${page}`;

  return request(url);
};

export const fetchSearchMovies = (page: number, keyword: string) => {
  const url = `${API_END_POINT}/search/movie?api_key=${
    process.env.API_KEY
  }&language=ko&page=${page}&query=${encodeURI(keyword)}`;

  return request(url);
};

export const fetchMovieDetailById = async (movieId: number) => {
  const url = `${API_END_POINT}/movie/${movieId}?api_key=${process.env.API_KEY}&language=ko`;
  const response = await request(url);
  const movieDetail = convertMovieDetail(response);

  return movieDetail;
};
