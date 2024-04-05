import { MovieDetailData, UserScoreType } from '../interface/MovieInterface';
import convertToPosterPath from '../util/convertToPosterPath';

export default class MovieDetail {
  private movieDetail: MovieDetailData;

  constructor(movieDetail: MovieDetailData) {
    this.movieDetail = {
      ...movieDetail,
      posterPath: convertToPosterPath({ relativePath: movieDetail.posterPath, width: 300 }),
    };
  }

  get data(): MovieDetailData {
    return { ...this.movieDetail };
  }

  set userScore(score: UserScoreType) {
    this.movieDetail.userScore = score;
  }
}
