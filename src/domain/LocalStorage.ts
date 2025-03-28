interface StoredMovie {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
  overview: string;
  genres: string;
  userRating: ('filled' | 'empty')[];
}

class LocalStorage {
  static #STORAGE_KEY = 'movies';

  static getMovies(): StoredMovie[] {
    const storedData = localStorage.getItem(this.#STORAGE_KEY);

    try {
      if (!storedData) return [];
      const parsedData: StoredMovie[] = JSON.parse(storedData);
      return parsedData;
    } catch (error) {
      throw new Error('로컬 스토리지에서 데이터를 불러 올 수 없습니다.');
    }
  }

  static saveMovie(movie: StoredMovie) {
    const existingList = this.getMovies();
    const filteredList = existingList.filter((m) => m.id !== movie.id);
    const updatedList = [...filteredList, movie];
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(updatedList));
  }

  static updateMovieStarById(id: number, stars: string[]) {
    const movies = this.getMovies();
    const updatedMovies = movies.map((movie) => (movie.id === id ? { ...movie, userRating: stars } : movie));
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(updatedMovies));
  }

  static getMovieStarById(id: number) {
    return this.getMovies().find((m) => m.id === id)?.userRating || ['empty', 'empty', 'empty', 'empty', 'empty'];
  }
}

export default LocalStorage;
