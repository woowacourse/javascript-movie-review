import fetchPopularMovies from "../fetch/fetchPopularMovies";

class Movies {
    #movieList

     constructor() {
        this.#movieList = [];
    }

    get movieList() {
        return this.#movieList
    }

    updateMovies(movies) {
        this.#movieList = movies;
    }

    addMovies(movies) {
        this.#movieList = [...this.#movieList, ...movies];
    }
}

const movies = new Movies();
export default movies;