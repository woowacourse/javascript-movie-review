import { MovieInfoType } from "../@types/movieType";

class MovieData {
  private _movieDatas: any;
  constructor(movieDatas: any) {
    this._movieDatas = movieDatas;
  }

  convertMovieData() {
    return this._movieDatas.map((item: MovieInfoType) => {
      const title = item?.title;
      const posterPath = item?.poster_path;
      const voteAverage = item?.vote_average;
      return { title, posterPath, voteAverage };
    });
  }
}

export default MovieData;
