import { MovieData } from '../interface/MovieData';
import convertToPosterPath from '../util/convertToPosterPath';

export default class Movie {
  private movie: MovieData;

  constructor(movie: MovieData) {
    this.movie = {
      ...movie,
      posterPath: convertToPosterPath({ relativePath: movie.posterPath, width: 200 }),
    };
  }

  get data(): MovieData {
    return { ...this.movie };
  }
}
