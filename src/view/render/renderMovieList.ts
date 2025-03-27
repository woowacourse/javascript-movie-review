import MovieList from '../MovieList';
import { $ } from '../../util/selector';
import { INITIAL_PAGE } from '../../constant';
import { MoveType } from '../../type';
import { moreButton } from '../moreButton';
interface ResponseType {
  page: number;
  results: MoveType[];
  total_pages: number;
  total_results: number;
}

export const renderMovieList = async (response: ResponseType, keyword?: string) => {
  const { results, total_pages } = response;
  const container = $('.container');

  const movieList = MovieList({
    movies: results,
    title: keyword ? `"${keyword}" 검색 결과` : '지금 인기 있는 영화'
  });
  container?.replaceChildren(movieList);

  if (INITIAL_PAGE < total_pages) {
    container?.appendChild(moreButton(INITIAL_PAGE, total_pages, keyword));
  }
};
