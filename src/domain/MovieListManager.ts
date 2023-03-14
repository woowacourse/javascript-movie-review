import { Movie } from "../type/movie";

const getPopolarMovieRequestUrl = (page = 1) => (
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`
);

const getSearchMovieUrl = (query: string, page = 1) => (
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`
);

class MovieListManager {
  private query: string = "";
  private list: Movie[] = [];
  private currentPage: number = 1;

  async fetchMovieList() {
    const url = this.query === "" 
      ? getPopolarMovieRequestUrl(this.currentPage)
      : getSearchMovieUrl(this.query, this.currentPage);
    
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.list = [...data.results]
      });
  }
}

export default MovieListManager;
