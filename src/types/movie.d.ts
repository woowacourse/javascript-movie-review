export type MovieData = {
  page: number;
  results: MovieItem[];
};

export type MovieItemProps = {
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
};

export type TotalMovieItemProps = {
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
  star_rating: StarRate;
};

export type StarRate = 0 | 2 | 4 | 6 | 8 | 10;

export type ShowMoreButtonOption = 'popular' | 'search';

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieDetailProps = {
  genres: MovieGenre[];
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  star_rating: StarRate;
};
