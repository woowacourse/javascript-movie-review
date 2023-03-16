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
    return movieItems?.map((item: MovieInfoType) => {
      const title = item?.title;
      const posterPath = item?.poster_path;
      const voteAverage = item?.vote_average;
      return { title, posterPath, voteAverage };
    });
  }

  async generateElement(getData: any, totalPage: number, currentPage: number) {
    // const movieItems = await getData();
    console.log(totalPage);
    const movieElement = await this.convertMovieData(getData)
      .map((item: any) => {
        return MovieItem(item);
      })
      .join("");

    totalPage <= currentPage && this.deleteMoreButton();
    return movieElement;

    // await movieItemList.bindEvent(this.generateElement(getData));
  }

  deleteMoreButton() {
    document.querySelector(".primary")?.remove();
  }
}

export default MovieData;
