import { GetMoviesByKeywordRes, GetPopularMoviesRes } from '../apis/movieChart.type';
import { ChangeProps } from '../types/common';
import { Movie } from './Movie';

type MovieChartInfo = ChangeProps<GetPopularMoviesRes, { results: Movie[] }>;

interface IMovieChart {
  movieChartInfo: MovieChartInfo;
}

export class MovieChart implements IMovieChart {
  movieChartInfo: MovieChartInfo;

  constructor(movieChartInfo: GetPopularMoviesRes | GetMoviesByKeywordRes) {
    this.movieChartInfo = {
      ...movieChartInfo,
      results: movieChartInfo.results.map((movieInfo) => new Movie(movieInfo)),
    };
  }
}
