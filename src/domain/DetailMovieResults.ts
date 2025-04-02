import { getDetailMovieResult } from "../api/movie/getDetailMovieResult";
import { storedDetailMovieItemType } from "../types/movieResultType";

class DetailMovieResults {
  detailMovieResults: storedDetailMovieItemType[] = [];

  constructor() {
    const detailMovieResults = localStorage.getItem("detailMovieResults");
    if (detailMovieResults) {
      this.detailMovieResults = JSON.parse(detailMovieResults);
    }
  }

  async getDetailMovieResultById(id: number) {
    const movieItem = this.detailMovieResults.find((movie: storedDetailMovieItemType) => movie.id === id);
    if (movieItem) {
      return movieItem;
    } else {
      const movieItem = await getDetailMovieResult(id);
      this.addDetailMovieResult({
        id: movieItem.id,
        poster_path: movieItem.poster_path,
        overview: movieItem.overview,
        title: movieItem.title,
        vote_average: movieItem.vote_average,
        starScore: 0,
      });
      return movieItem;
    }
  }

  addDetailMovieResult(movieItem: storedDetailMovieItemType) {
    this.detailMovieResults.push(movieItem);
    this.updateLocalStorage();
  }

  updateStarScore(id: number, score: number) {
    const targetMovie = this.detailMovieResults.find((movie) => movie.id === id);
    if (targetMovie) {
      targetMovie.starScore = score;
    }

    this.updateLocalStorage();
  }

  // 로컬스토리지 업데이트
  updateLocalStorage(): void {
    localStorage.setItem("detailMovieResults", JSON.stringify(this.detailMovieResults));
  }
}

export default DetailMovieResults;
