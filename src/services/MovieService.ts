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

    if (response.status === 500) {
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요😅");
    }

    return [];
  }

  async getSearchResult(searchWord: string) {
    const response = await fetch(
      `${this.baseUrl}/search/movie?query=${searchWord}&include_adult=false?language=ko-KR&page=${this.currentPage}`,
      options
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    if (response.status === 500) {
      alert("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요😅");
    }
    return [];
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default MovieService;
