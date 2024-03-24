/* 제너릭 타입 상속이 목적이므로, 다음 규칙을 비활성화 한다. */
// eslint-disable-next-line no-use-before-define
interface TmdbResponse<T extends Movie> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface Movie {
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
}
