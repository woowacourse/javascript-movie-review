export interface MovieItemProps {
  id: number;
  posterPath: string;
  rate: number;
  title: string;
}

export interface MovieDetailProps {
  posterPath: string;
  title: string;
  releaseYear: string;
  category: string[];
  rate: number;
  detail: string;
}
