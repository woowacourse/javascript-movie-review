export type FetchedMovieItemJson = {
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

export type FetchedMovieJson = {
  page: number;
  results: FetchedMovieItemJson[];
  total_pages: number;
};

type FetchJson = <T>(url: string) => Promise<T>;

const fetchJson: FetchJson = async api => {
  const response = await fetch(api);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default fetchJson;
