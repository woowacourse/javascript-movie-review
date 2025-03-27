import MovieList from '../MovieList';
import { $ } from '../../util/selector';
import { INITIAL_PAGE } from '../../constant';
import { ResponseType } from '../../type';
import { moreButton } from '../moreButton';

export const renderMovieList = async (response: ResponseType, keyword?: string) => {
  const { results, totalPages } = response;
  const container = $('.container');

  const movieList = MovieList({
    movies: results,
    title: keyword ? `"${keyword}" 검색 결과` : '지금 인기 있는 영화'
  });
  container?.replaceChildren(movieList);

  if (INITIAL_PAGE < totalPages) {
    container?.appendChild(moreButton(INITIAL_PAGE, totalPages, keyword));
  }
};
