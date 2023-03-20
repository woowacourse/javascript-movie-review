import type { MovieResponse, Movie } from "../types";

class Movies {
  #list: Movie[];

  constructor(list: MovieResponse[]) {
    this.#list = this.convertResponseToMovieData(list);
  }

  getList(): Movie[] {
    return this.#list;
  }

  add(list: MovieResponse[]) {
    this.#list = [...this.#list, ...this.convertResponseToMovieData(list)];
  }

  reset(list: MovieResponse[]) {
    this.#list = this.convertResponseToMovieData(list);
  }

  convertResponseToMovieData(list: MovieResponse[]): Movie[] {
    return list.map((data): Movie => {
      return {
        id: data.id,
        poster_path: data.poster_path,
        title: data.title,
        vote_average: data.vote_average,
      };
    });
  }
}

export { Movies };
