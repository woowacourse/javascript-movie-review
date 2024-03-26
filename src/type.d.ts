interface IMovieItemData {
  poster_path: string;
  title: string;
  vote_average: number;
}

interface IUrlSearchParamsConfig {
  [key: string]: string;
  api_key: string;
  language: string;
  page: string;
}
