export interface ApiMovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  overview: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  title: string;
  src: string;
  voteAverage: number;
  id: number;
}

export interface MovieModal {
  genres: [{ id: number; name: string }];
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
}
