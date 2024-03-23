import MovieData from './MovieData';

interface ResponseData {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export default ResponseData;
