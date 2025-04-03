export interface MovieData {
  id: number;
  imgUrl: string;
  score: number;
  title: string;
  overview: string;
}

export interface MovieDetailData {
  id: number;
  imgUrl: string;
  score: number;
  title: string;
  genres: string;
  overview: string;
  release_date: string;
  userRating?: number;
}
