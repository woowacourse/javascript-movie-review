import IMovieData from './IMovieData';

interface IRespondData {
  page: number;
  results: IMovieData[];
  total_pages: number;
  total_results: number;
}

export default IRespondData;
