import { getDetailMovieResult } from "../api/getDetailMovieResult";
import { storedMovieItemType } from "../types/movieResultType";

class StorageMovieResults {
  storedMovieResults: storedMovieItemType[] = [];

  constructor() {
    const storedMovieResults = localStorage.getItem("storedMovieResults");
    if (storedMovieResults) {
      this.storedMovieResults = JSON.parse(storedMovieResults);
    }
  }

  async getDetailMovieResultById(id: number) {
    const movieItem = this.storedMovieResults.find((movie: storedMovieItemType) => movie.id === id);
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

  addDetailMovieResult(movieItem: storedMovieItemType) {
    this.storedMovieResults.push(movieItem);
    console.log(this.storedMovieResults);
    this.updateLocalStorage();
  }

  updateStarScore(id: number, score: number) {
    const targetMovie = this.storedMovieResults.find((movie) => movie.id === id);
    if (targetMovie) {
      targetMovie.starScore = score;
    }

    this.updateLocalStorage();
  }

  // 로컬스토리지 업데이트
  updateLocalStorage(): void {
    localStorage.setItem("storedMovieResults", JSON.stringify(this.storedMovieResults));
  }
}

export default StorageMovieResults;
