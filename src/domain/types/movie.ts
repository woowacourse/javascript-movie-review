export interface MovieApiData {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieInfo {
  id: number;
  title: string;
  posterSrc: string | null;
  voteAverage: number;
}

export interface MovieDetailInfo extends MovieInfo {
  genreIds: number[];
  overview: string;
  myVote: number;
}
