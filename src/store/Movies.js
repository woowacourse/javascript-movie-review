import fetchPopularMovies from "../fetch/fetchPopularMovies";

class Movies {
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

    addMovies(movies) {
        this.#movies = [...this.#movies, ...movies];
    }
}

const movies = new Movies();
export default movies;