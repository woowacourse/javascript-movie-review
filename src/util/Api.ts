import {
  GenreType,
  listAPIReturnType,
  MovieDetails,
  MovieElementData,
  MovieItem,
} from "../abstracts/type";
import { REQUEST_URL } from "../constants/constants";
import { API_KEY } from "../constants/key";

export const fetchMovieDetails = async (movieId: string) => {
  const data = await fetch(
    `${REQUEST_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`,
    { method: "GET" }
  ).then(async (res) => {
    const movieDetails = await res.json();

    movieDetails.genres = movieDetails.genres
      .map((genre: GenreType) => genre.name)
      .join(", ");

    return movieDetails;
  });

  const { id, genres, overview, poster_path, title, vote_average } = data;
  const detailData: MovieDetails = {
    id,
    genres,
    overview,
    poster_path,
    title,
    vote_average,
  };

  return detailData;
};

export const fetchPopularMovieList = async (
  nextPage: number
): Promise<listAPIReturnType> => {
  return await fetch(
    `${REQUEST_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${nextPage}`,
    { method: "GET" }
  ).then(async (res) => {
    return !res.ok
      ? { isSuccess: false, data: {} }
      : { isSuccess: true, data: await generateListAPIReturnData(res) };
  });
};

export const fetchSearchMovieList = async (
  searchValue: string,
  nextPage: number
): Promise<listAPIReturnType> => {
  return await fetch(
    `${REQUEST_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchValue}&page=${nextPage}&include_adult=false`,
    { method: "GET" }
  ).then(async (res) => {
    return !res.ok
      ? { isSuccess: false, data: {} }
      : { isSuccess: true, data: await generateListAPIReturnData(res) };
  });
};

const generateListAPIReturnData = async (res: any) => {
  const data = await res.json();

  const movieItems: MovieItem[] = data.results;
  const requiredMovieItemsData: MovieElementData[] = movieItems.map(
    (movieData: MovieItem) => {
      return {
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        vote_average: movieData.vote_average,
      };
    }
  );

  const totalPage = data.total_pages;

  return {
    list: requiredMovieItemsData,
    totalPage,
  };
};
