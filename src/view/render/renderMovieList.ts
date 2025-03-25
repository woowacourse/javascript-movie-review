import getPopularMovies from '../../api/getPopularMovies';
import Button from '../../component/Button';
import Movie from '../../component/Movie';
import MovieList from '../../component/MovieList';
import SkeletonList from '../../component/SkeletonList';
import { API_PAGE_LIMIT, INITIAL_PAGE } from '../../constant';
import { IMovie } from '../../type';
import { $ } from '../../util/selector';

const handleMoreButtonClick = async (page: number, moreButton: HTMLElement) => {
  if (page >= API_PAGE_LIMIT - 1) {
    moreButton.remove();
  }
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const skeletonList = SkeletonList({ height: 300 });
  container.appendChild(skeletonList);

  const params = {
    page: page.toString(),
    language: 'ko-KR'
  };

  const response = await getPopularMovies('/movie/popular', params);
  if (!response) return;
  const newMovies = response.results;

  skeletonList.remove();

  const fragment = document.createDocumentFragment();
  newMovies.forEach((movie: IMovie) => {
    const newMovie = Movie({ movie });
    fragment.appendChild(newMovie);
  });

  container.appendChild(fragment);
};

export const renderMovieList = async (movies: IMovie[]) => {
  const container = $('.container');
  if (!container) return;

  const skeletonList = SkeletonList({ height: 300 });
  container.appendChild(skeletonList);

  let page = INITIAL_PAGE;

  const movieList = MovieList({ movies, title: '지금 인기 있는 영화' });

  const moreButton = Button({
    text: '더보기',
    id: 'moreButton',
    onClick: () => handleMoreButtonClick(++page, moreButton)
  });

  skeletonList.replaceWith(movieList);
  container.appendChild(moreButton);
};
