interface IMovieItemData {
  poster_path: string;
  title: string;
  id: number;
  vote_average: number;
}

interface IMovieDetailsData extends Omit<IMovieItemData, "id"> {
  genres: object[];
  overview: string;
}

interface IGenre {
  id: number;
  name: string;
}
interface IUrlSearchParamsConfig {
  [key: string]: string;
  api_key: string;
  language: string;
  page: string;
}

interface IMovieInput {
  movieId?: number;
  starFilledCount?: number;
}
