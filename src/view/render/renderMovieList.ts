import MovieList from '../../component/MovieList';
import { $ } from '../../util/selector';
import { INITIAL_PAGE } from '../../constant';
import { IMovie } from '../../type';
import { renderSkeletons } from './renderSkeletons';
import { moreButton } from '../moreButton';
interface IResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const renderMovieList = async (response: IResponse, keyword?: string) => {
  const { results, total_pages } = response;
  const container = $('.container');

  container?.appendChild(renderSkeletons({ height: 300 }));

  const movieList = MovieList({
    movies: results,
    title: keyword ? `"${keyword}" 검색 결과` : '지금 인기 있는 영화'
  });
  container?.replaceChildren(movieList);

  if (INITIAL_PAGE < total_pages) {
    container?.appendChild(moreButton(INITIAL_PAGE, total_pages, keyword));
  }
};
