import MovieApp from '../MovieApp';
import HTTPError from '../api/HttpError';
import httpRequest from '../api/httpRequest';
import errorMessage from '../error/errorMessage';
import { MovieDataType } from '../types/movie';
import { RenderType, RenderInputType } from '../types/props';
import filterMovieList from './filterMovieList';

type RequestFunctionType = (page: number, input: string) => Promise<MovieDataType>;

type HandleMovieDataTableType = { [key in RenderType]: () => Promise<MovieDataType> };

interface PageInputType {
  page: number;
  input: string;
}

const movieData = {
  async handleMovieData(
    movieApp: MovieApp,
    { renderType, input }: RenderInputType,
  ): Promise<MovieDataType> {
    const page = movieApp.getPage(renderType);
    const handleMovieDataTable: HandleMovieDataTableType = {
      popular: () =>
        this.getMovieData(httpRequest.fetchPopularMovies, { page, input: input ?? '' }),
      search: () =>
        this.getMovieData(httpRequest.fetchSearchedMovies, { page, input: input ?? '' }),
    };
    const getDataFunction = handleMovieDataTable[renderType];
    const getData = await getDataFunction();
    return getData;
  },

  async getMovieData(
    requestFunction: RequestFunctionType,
    { page, input }: PageInputType,
  ): Promise<MovieDataType> {
    try {
      const { movieList, isLastPage } = await requestFunction(page, input ?? '');
      const filteredMovieList = filterMovieList(movieList);
      return { movieList: filteredMovieList, isLastPage };
    } catch (error) {
      const customError = error as HTTPError;
      errorMessage.apiError(customError.statusCode, customError.message ?? '');
      return { movieList: [], isLastPage: true };
    }
  },
};

export default movieData;
