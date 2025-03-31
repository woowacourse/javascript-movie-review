import type { Result, TMDBDetails } from "../../types/tmdb.types";

/**
 * Converts a Result object to a TMDBDetails object with default values for missing properties
 */
export const convertResultToTMDBDetails = (movie: Result): TMDBDetails => {
  return {
    poster_path: movie.poster_path || "",
    release_date: new Date(movie.release_date),
    overview: movie.overview,
    title: movie.title,
    vote_average: movie.vote_average,
    id: movie.id,
    adult: movie.adult,
    backdrop_path: movie.backdrop_path || "",
    belongs_to_collection: {
      id: 0,
      name: "",
      poster_path: "",
      backdrop_path: "",
    },
    budget: 0,
    genres: [],
    homepage: "",
    imdb_id: "",
    origin_country: [],
    original_language: movie.original_language,
    original_title: movie.original_title,
    popularity: movie.popularity,
    production_companies: [],
    production_countries: [],
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: "",
    tagline: "",
    video: movie.video,
    vote_count: movie.vote_count,
  };
};
