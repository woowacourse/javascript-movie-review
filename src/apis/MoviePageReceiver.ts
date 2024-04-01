interface MovieInfo {
  title: string;
  imgSrc: string;
  rating: number;
  id: string;
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
  id: string;
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

interface MovieDetail {
  posterSrc: string;
  title: string;
  genres: [];
  rating: number;
  description?: string;
}
class MoviePageReceiver {
  #popularPage = 1;
  #posterSrcHeader = `https://image.tmdb.org/t/p/w220_and_h330_face/`;
  #posterOriginSrcHeader = "https://image.tmdb.org/t/p/original/";
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

      nowPage++;
      const pageResponse = await this.#getTMDBPageResponse(url);
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

      nowPage++;
      const pageResponse = await this.#getTMDBPageResponse(url);
      const movieInfos: MovieInfo[] = this.#getMovieInfosInPage(pageResponse);

      return {
        movieInfos,
        isLastPage: this.#popularPage === pageResponse.total_pages,
      };
    }).bind(this);
  }

  async fetchMovieDetail(movieId: string): Promise<MovieDetail> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

    const detail = fetch(url, this.#options)
      .then((res) => res.json())
      .then((obj) => this.#getMovieDetail(obj));

    return detail;
  }

  #getMovieDetail(obj: any): MovieDetail {
    const title = obj.title;
    const posterSrc = this.#posterOriginSrcHeader + obj.poster_path;
    const genres = obj.genres?.map((genre: any) => genre.name) ?? ["장르 없음"];
    const rating = obj.vote_average;
    const description = obj.overview;

    return { title, posterSrc, genres, rating, description };
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
        id: result.id,
      };
    });
  }
}

export default MoviePageReceiver;
