import convertToPosterUrl from '../util/convertToPosterUrl';

interface MovieData {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export default class Movie {
  private movie: MovieData;

  constructor(movie: MovieData) {
    this.movie = {
      ...movie,
      posterPath: convertToPosterUrl({ relativePath: movie.posterPath, width: 200 }),
    };
  }

  get data(): MovieData {
    return { ...this.movie };
  }
}
