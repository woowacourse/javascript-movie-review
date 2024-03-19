interface MovieData {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export default class Movie {
  private movie: MovieData;

  constructor(movie: MovieData) {
    this.movie = movie;
  }

  get data(): MovieData {
    return { ...this.movie };
  }
}
