interface MovieInfo {
  title: string;
  imgSrc: string;
  rating: number;
}

interface MoviePage {
  movieInfos: MovieInfo[];
  isLastPage: boolean;
}

interface TMDBPageResponse {
  page: number;
  results: MovieInfoInPage[];
  total_pages: number;
  total_results: number;
}

interface MovieInfoInPage {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

class MoviePageReceiver {
  #popularPage = 1;
  #posterSrcHeader = `https://image.tmdb.org/t/p/w220_and_h330_face/`;
  #popularUrlHeader =
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=";
  #options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  getFetchPopularMoviePage() {
    let nowPage = 1;

    return (async () => {
      const url = `${this.#popularUrlHeader}${nowPage}`;

      const pageResponse = await this.#getTMDBPageResponse(url);
      nowPage++;
      const movieInfos: MovieInfo[] = this.#getMovieInfosInPage(pageResponse);

      return {
        movieInfos,
        isLastPage: this.#popularPage === pageResponse.total_pages,
      };
    }).bind(this);
  }

  getFetchSearchMoviePage(movieName: string) {
    let nowPage = 1;
    const getUrl = (page: number) =>
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=ko-KR&page=${page}`;

    return (async () => {
      const url = getUrl(nowPage);

      const pageResponse = await this.#getTMDBPageResponse(url);
      nowPage++;
      const movieInfos: MovieInfo[] = this.#getMovieInfosInPage(pageResponse);

      return {
        movieInfos,
        isLastPage: this.#popularPage === pageResponse.total_pages,
      };
    }).bind(this);
  }

  async #getTMDBPageResponse(url: string) {
    const response = await fetch(url, this.#options);
    const tmdbPageResponse: TMDBPageResponse = await response.json();
    return tmdbPageResponse;
  }

  #getMovieInfosInPage(tmdbPageResponse: TMDBPageResponse) {
    return tmdbPageResponse.results.map((result) => {
      return {
        title: result.title,
        imgSrc: this.#posterSrcHeader + result.poster_path,
        rating: result.vote_average,
      };
    });
  }
}

export default MoviePageReceiver;
