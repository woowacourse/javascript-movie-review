import MoviePage from './pages/MoviePage.ts';
import TopRateHeader from './components/header/TopRateHeader.ts';
import SearchHeader from './components/header/SearchHeader.ts';
import { fetchMovieDetails, fetchPopularMovies, fetchSearchMovies } from './api/fetchApi.ts';
import { ResponseMovie } from './api/types.ts';

const onSubmit = (query: string): void => {
  if (query.trim()) {
    location.hash = `/search?query=${encodeURIComponent(query)}`;
  }
};

export const createHomePage = (): MoviePage => {
  const header = new TopRateHeader(onSubmit);
  return new MoviePage({
    fetchMovie: (page: number) => fetchPopularMovies(page),
    fetchDetail: (movie_id: number) => fetchMovieDetails(movie_id),
    $header: header.$element,
    title: '지금 인기있는 영화',
    onInitHeader: (res: ResponseMovie) => header.render(res.results[0]),
  });
};

export const createSearchPage = (query: string): MoviePage => {
  return new MoviePage({
    fetchMovie: (page: number) => fetchSearchMovies(query, page),
    fetchDetail: (movie_id: number) => fetchMovieDetails(movie_id),
    $header: new SearchHeader(onSubmit).$element,
    title: `"${query}" 검색 결과`,
  });
};
