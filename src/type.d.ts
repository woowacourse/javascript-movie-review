interface IMovieItemData {
  poster_path: string;
  title: string;
  id: number;
  vote_average: number;
}

interface IMovieDetailsData {
  poster_path: string;
  title: string;
  vote_average: number;
  genres: object[];
  overview: string;
}

interface IUrlSearchParamsConfig {
  [key: string]: string;
  api_key: string;
  language: string;
  page: string;
}
