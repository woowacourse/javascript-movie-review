import { MovieDetailData } from '../interface/MovieInterface';

export default class MovieDetail {
  private movieDetail: MovieDetailData;

  constructor(movieDetail: MovieDetailData) {
    this.movieDetail = movieDetail;
  }

  get data(): MovieDetailData {
    return { ...this.movieDetail };
  }
}
