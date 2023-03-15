import { request } from '../utils/common';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';

interface Movie {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
}

interface ApiMovieProps {
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

class MovieData {
  #movies: Movie[] = [];
  #pageIndex: number = 1;

  get movies(): Movie[] {
    return this.#movies;
  }

  async update() {
    const movies = await this.parse();

    this.#movies = movies;
  }

  async parse(): Promise<Movie[]> {
    const url = `${BASE_URL}popular?api_key=${
      process.env.API_KEY
    }&language=ko&page=${this.#pageIndex}`;

    const movies = await (await (await request(url)).json()).results;

    return movies.map((movie: ApiMovieProps) => {
      return {
        id: movie.id,
        title: movie.title,
        imgUrl: movie.poster_path,
        score: movie.vote_average,
      };
    });
  }
}

export default MovieData;
