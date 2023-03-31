import { getMovieGenre } from './api';

interface genreInterface {
  id: number;
  name: string;
}

class GenreData {
  #genre: genreInterface[];

  constructor() {
    this.#genre = [];
    this.useGenre();
  }

  async useGenre() {
    const { genres } = await getMovieGenre();
    this.#genre = genres;
  }

  getMovieGenreText(genreNumList: number[]) {
    if (this.#genre.length === 0) return '';
    return genreNumList
      .map((num) => this.#genre.find((elem) => elem.id === num))
      .map((elem) => elem?.name)
      .join(', ');
  }
}

export default new GenreData();
