import { MovieInfoType, TotalMovieInfoType } from "../@types/movieType";
import { MovieItem } from "../components/MovieItem";

class MovieDataManager {
  convertMovieData(movieItems: TotalMovieInfoType[]) {
    return movieItems?.map((item: MovieInfoType) => {
      const title = item?.title;
      const posterPath = item?.poster_path;
      const voteAverage = item?.vote_average;
      return { title, posterPath, voteAverage };
    });
  }

  async generateElement(
    movieData: TotalMovieInfoType[],
    totalPage: number,
    currentPage: number
  ) {
    const movieElement = this.convertMovieData(movieData)
      .map((item: any) => {
        return MovieItem(item);
      })
      .join("");

    totalPage <= currentPage && this.deleteMoreButton();
    return movieElement;
  }

  deleteMoreButton() {
    document.querySelector(".primary")?.remove();
  }
}

export default MovieDataManager;
