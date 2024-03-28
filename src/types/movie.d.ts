type ImageSrc = string;

export interface MovieItem {
  id: number;
  title: string;
  posterSrc: ImageSrc;
  voteAverage: number;
}

export interface MovieDetail {
  id: number;
  title: string;
  posterSrc: ImageSrc;
  genres: string[];
  voteAverage: number;
  overview: string;
}
