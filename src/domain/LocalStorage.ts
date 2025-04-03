import { MovieDetailData } from '../../types/movie';

class LocalStorage {
  static #STORAGE_KEY = 'movies';

  static getMovies(): MovieDetailData[] {
    const storedData = localStorage.getItem(this.#STORAGE_KEY);
    if (!storedData) return [];

    try {
      const parsedData: MovieDetailData[] = JSON.parse(storedData);
      return parsedData;
    } catch (error) {
      throw new Error('로컬 스토리지에서 데이터를 불러 올 수 없습니다.');
    }
  }

  static saveMovie(movie: MovieDetailData) {
    const existingList = this.getMovies();
    const filteredList = existingList.filter((m) => m.id !== movie.id);
    const updatedList = [...filteredList, movie];
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(updatedList));
  }

  static getMovieStarById(id: number) {
    return this.getMovies().find((m) => m.id === id)?.userRating || 0;
  }
}

export default LocalStorage;
