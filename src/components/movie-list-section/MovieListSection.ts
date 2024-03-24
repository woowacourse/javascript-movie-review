import Button from '../common/Button';
import Wrapper from '../common/Wrapper';
import TextBox from '../common/TextBox';
import { appendChildren } from '../../utils/domUtils';
import List from '../common/List';
import MovieListController from '../../controllers/MovieListController';
import MovieListSkeleton from './MovieListSkeleton';

const handleMoreButtonClick = () => {
  MovieListController.moreLoadMovieList();
};

export default function MovieListSection() {
  const $section = Wrapper({ type: 'section', attrs: { class: 'item-view' } });
  const $title = TextBox({ type: 'h2', attrs: { text: '지금 인기 있는 영화' } });
  const $movieList = List({ type: 'ul', attrs: { class: 'item-list' } });
  const $movieListSkeleton = MovieListSkeleton();
  const $moreButton = Button({
    button: { type: 'button', text: '더 보기', class: 'btn primary full-width hidden', click: handleMoreButtonClick }
  });

  appendChildren($section, [$title, $movieList, $movieListSkeleton, $moreButton]);

  return $section;
}
