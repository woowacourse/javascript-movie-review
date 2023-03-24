import { ApiData, MovieApiResponse, Movie } from "../type";
import { movieStore } from "./movieStore";
import { API, PATH } from "../constants";
const { URL: API_URL, LANGUAGE } = API;
const { POPULAR_MOVIE } = PATH;

export const movieApi = {
  url: new URL(API_URL),
  urlParams: new URLSearchParams(),
  totalPage: 2,

  showMovies(endpoint: string = POPULAR_MOVIE, keyword: string = "") {
    fetchMovieInfo(endpoint, keyword);
  },
};

const fetchMovieInfo = async (endpoint: string, keyword: string) => {
  const movieUrl = buildMovieUrl(endpoint, keyword);
  const movieApiData = await fetch(movieUrl).then((response) =>
    response.json()
  );
  catchError(movieApiData);

  saveMovieInfoResponse(movieApiData);
};

const buildMovieUrl = (endpoint: string, keyword: string) => {
  movieApi.url = new URL(endpoint, API_URL);
  const urlParams = new URLSearchParams(`api_key=${process.env.API_KEY}`);

  urlParams.set("language", LANGUAGE);
  urlParams.set("page", movieApi.urlParams.get("page") ?? "1");
  urlParams.set("query", keyword);

  movieApi.urlParams = urlParams;

  return `${movieApi.url}?${urlParams}`;
};

const catchError = (movieApiData: ApiData) => {
  try {
    if (movieApiData.success === false)
      throw new Error(movieApiData.status_message);
  } catch (error) {
    if (error instanceof Error) return alert(error.message);
  }
};

const saveMovieInfoResponse = (movieApiData: ApiData) => {
  movieApi.totalPage = movieApiData.total_pages;

  movieStore.appendMovies(convertApiResponseToMovieList(movieApiData.results));
};

const convertApiResponseToMovieList = (
  results: Array<MovieApiResponse>
): Array<Movie> => {
  return results.map((movie) => {
    return {
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
      id: movie.id
    };
  });
};
