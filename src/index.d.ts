export interface Movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Genres {
  id: number;
  name: string;
}

export interface MovieDetail {
  genres: Genres[];
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}
