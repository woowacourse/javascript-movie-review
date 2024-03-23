import IMovieData from './IMovieData';

interface IResponseData {
  page: number;
  results: IMovieData[];
  total_pages: number;
  total_results: number;
}

export default IResponseData;
