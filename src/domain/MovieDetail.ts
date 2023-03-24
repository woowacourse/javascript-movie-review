import { MovieApiData, MovieDetailInfo } from "./types";

class MovieDetail {
  private movieDetailInfo: MovieDetailInfo;

  constructor(movieData: MovieApiData, myVote: number) {
    this.movieDetailInfo = {
      id: movieData.id,
      title: movieData.title,
      posterSrc: movieData.poster_path,
      voteAverage: movieData.vote_average,
      genreIds: movieData.genre_ids,
      overview: movieData.overview,
      myVote: myVote,
    };
  }

  getMovieDetailInfo() {
    return this.movieDetailInfo;
  }
}

export default MovieDetail;
