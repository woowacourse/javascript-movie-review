export interface Movie {
  id: number;
  title: string;
  rate: number;
  thumbnail_path: string | null;
  hero_path: string | null;
}

export interface MovieDetail extends Movie {
  genres: string[];
  releaseYear: string;
  overview: string;
}