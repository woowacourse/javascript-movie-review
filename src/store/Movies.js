import fetchPopularMovies from "../fetch/fetchPopularMovies";

export default class Movies {
    #movies

     constructor() {
        this.#movies = [];
    }

    updateMovies(movies) {
        this.#movies = movies;
    }
    getMovies() {
        return this.#movies;
    }
}
