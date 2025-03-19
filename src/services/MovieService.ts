const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

class MovieService {
  currentPage: number;
  baseUrl: string;

  constructor() {
    this.currentPage = 1;
    this.baseUrl = import.meta.env.VITE_REQUEST_URL;
  }

  async getPopularMovies() {
    const response = await fetch(
      `${this.baseUrl}/movie/popular?language=ko-KR&page=${this.currentPage}`,
      options
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return [];
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  //   resetPage() {
  //     this.currentPage = 1;
  //   }
}

export default MovieService;
