interface IMovieItemData {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
}

interface IUrlSearchParamsConfig {
  [key: string]: string;
  api_key: string;
  language: string;
  page: string;
}

interface IMovieDetailData {
  id: number;
  title: string;
  poster_path: string;
  genres: IGenre[];
  vote_average: number;
  overview: string;
}

interface IGenre {
  id: number;
  name: string;
}
