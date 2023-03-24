import { MovieApiData, MovieInfo } from "./types/movie";

class Movie {
  private movieInfo: MovieInfo;

  constructor(movieData: MovieApiData) {
    this.movieInfo = {
      id: movieData.id,
      title: movieData.title,
      posterSrc: movieData.poster_path,
      voteAverage: movieData.vote_average,
    };
  }

  getMovieInfo() {
    return this.movieInfo;
  }
}

export default Movie;
