export type Genre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'TV Movie'
  | 'Thriller'
  | 'War'
  | 'Western';

type Language = string; // 'en' | ...

export interface MovieResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: Language;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface MovieSearchResult {
  movies: Movie[];
  totalPages: number;
}

export interface Movie {
  id: number;
  title: string;
  imageSrc: string;
  score: number;
  genre: Genre[];
  description: string;
}
