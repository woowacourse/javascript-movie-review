import { MovieInfoType } from "../@types/movieType";
import { MovieItem } from "../components/MovieItem";
import MovieItemList from "../components/MovieItemList";

class MovieData {
  private _movieDatas: any; // any?
  private _currentTab: string;

  getData: any;

  constructor() {
    this._movieDatas;
    this._currentTab = "all";
    // this.getData = getData;
  }

  convertMovieData(movieItems: any) {
    // any..?
    return movieItems.map((item: MovieInfoType) => {
      const title = item?.title;
      const posterPath = item?.poster_path;
      const voteAverage = item?.vote_average;
      return { title, posterPath, voteAverage };
    });
  }

  async generateElement(getData: any) {
    const movieItems = await getData();
    const movieElement = await this.convertMovieData(movieItems)
      .map((item: any) => {
        return MovieItem(item);
      })
      .join("");
    return movieElement;

    // await movieItemList.bindEvent(this.generateElement(getData));
  }
}

export default MovieData;
