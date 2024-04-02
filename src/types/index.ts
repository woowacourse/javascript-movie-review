type Link = `https://${string}` | `http://${string}`;

export interface MovieType {
  id: number;
  title: string;
  voteAverage: number;
  thumbnail: Link;
}

export interface MovieDetailType extends MovieType {
  overview: string;
  genres: string[];
}
