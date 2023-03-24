import { MovieDetailApiData, MovieDetailInfo } from "./types/movieDetail";

class MovieDetail {
  private movieDetailInfo: MovieDetailInfo;

  constructor(movieData: MovieDetailApiData, myVote: number) {
    this.movieDetailInfo = {
      id: movieData.id,
      title: movieData.title,
      posterSrc: movieData.poster_path,
      voteAverage: movieData.vote_average,
      genres: movieData.genres,
      overview: movieData.overview,
      myVote: myVote,
    };
  }

  getMovieDetailInfo() {
    return this.movieDetailInfo;
  }
}

export default MovieDetail;
