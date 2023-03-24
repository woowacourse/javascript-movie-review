import MovieDetailModal from "../components/MovieDetailModal";
import { API } from "../constants";
import { $ } from "../utils/selector";
const { URL: API_URL, LANGUAGE } = API;

export const getMovieDetail = async (id: number) => {
  const movieUrl = buildMovieDetailUrl(id);

  const movieDetailApi = await fetch(movieUrl).then((response) =>
    response.json()
  );

  $<MovieDetailModal>("#modal").renderMovieDetail(
    convertApiResponseToMovieList(movieDetailApi)
  );
};

const buildMovieDetailUrl = (id: number) => {
  const url = new URL(`movie/${id}`, API_URL);
  const urlParams = new URLSearchParams(`api_key=${process.env.API_KEY}`);

  urlParams.set("language", LANGUAGE);

  return `${url}?${urlParams}`;
};

const convertApiResponseToMovieList = (results: any): any => {
  return {
    poster: results.poster_path,
    title: results.title,
    ratings: results.vote_average,
    overview: results.overview,
    genres: results.genres.map((genre: any) => genre.name).join(", "),
    id: results.id,
  };
};
