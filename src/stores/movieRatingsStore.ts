import MovieRatings from "../domain/MovieRatings";
import DomainStore from "./DomainStore";
import Store from "./Store";
import MovieRatingsMapper from "./mappers/MovieRatingsMapper";

const MOVIE_RATINGS_KEY = "movieRatings";

export const movieRatingsStore = new DomainStore<MovieRatings>({
  key: MOVIE_RATINGS_KEY,
  mapper: new MovieRatingsMapper(),
  store: new Store(),
});
