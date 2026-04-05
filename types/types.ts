export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

export type MovieResponse = {
  results: Movie[];
  total_pages: number;
};

export type UpdateMoreButton = (
  moreButton: HTMLButtonElement,
  data: MovieResponse,
) => void;
