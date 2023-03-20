export interface IMovie {
  title: string;
  posterSrc: string | null;
  voteAverage: number;
}

interface IMovieApiData {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

class Movie {
  private movieData: IMovie;

  constructor(movieData: IMovieApiData) {
    this.movieData = {
      title: movieData.title,
      posterSrc: movieData.poster_path,
      voteAverage: movieData.vote_average,
    };
  }

  getMovieData() {
    return this.movieData;
  }
}

export default Movie;
