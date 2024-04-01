import convertToPosterPath from '../util/convertToPosterPath';
import { MovieData } from './MovieServiceType';

export default class Movie {
  private movie: MovieData;

  constructor(movie: MovieData) {
    this.movie = movie;
  }

  get data(): MovieData {
    return { ...this.movie };
  }
}
