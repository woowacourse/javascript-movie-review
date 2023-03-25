import MovieDetailModal from "../components/movieDetailModal";
import { API } from "../constants";
import { MovieDetail, MovieDetailApiResponse } from "../type";
import { $ } from "../utils/selector";
const { URL: API_URL, LANGUAGE } = API;

export const getMovieDetail = async (id: number) => {
  const movieUrl = buildMovieDetailUrl(id);

  const movieDetailApi = await fetch(movieUrl).then((response) =>
    response.json()
  );

  const userRatings = localStorage.getItem(movieDetailApi.id)
    ? `${localStorage.getItem(movieDetailApi.id)}`
    : "0";

  $<MovieDetailModal>("#modal").renderMovieDetail(
    convertApiResponseToMovieDetail(movieDetailApi, userRatings)
  );
};

const buildMovieDetailUrl = (id: number) => {
  const url = new URL(`movie/${id}`, API_URL);
  const urlParams = new URLSearchParams(`api_key=${process.env.API_KEY}`);

  urlParams.set("language", LANGUAGE);

  return `${url}?${urlParams}`;
};

const convertApiResponseToMovieDetail = (
  results: MovieDetailApiResponse,
  userRatings: string
): MovieDetail => {
  return {
    poster: results.poster_path,
    title: results.title,
    ratings: results.vote_average,
    overview: results.overview,
    genres: results.genres.map((genre) => genre.name).join(", "),
    id: results.id,
    userRatings: userRatings,
  };
};
