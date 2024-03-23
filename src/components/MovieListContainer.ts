import { renderAlertModalForNullEl } from '../service/AlertModalForNullEl';
import { ListType, Movie, PartialMovieDataForItemView } from '../type/movie';
import { createElementWithAttribute } from '../utils';

import MoreButton from './MoreButton';
import MovieList from './MovieList';
import MovieListTitle from './MovieListTitle';

interface MovieListContainerProps {
  titleText: string;
  movieData: PartialMovieDataForItemView;
  listType: ListType;
}
class MovieListContainer {
  constructor(props: MovieListContainerProps) {
    this.#renderMovieListContainer(props);
  }

  #makeSection = (titleText: string, movieList: Movie[] | undefined) => {
    const $section = createElementWithAttribute('section', {
      class: 'movie-list-container',
    });
    $section.appendChild(new MovieListTitle(titleText).element);
    $section.appendChild(new MovieList(movieList).element);

    return $section;
  };

  #renderMovieListContainer = (props: MovieListContainerProps) => {
    const { titleText, movieData, listType } = props;
    const $main = document.querySelector('main');
    const $section = this.#makeSection(titleText, movieData.movieList);

    if (!$main) {
      renderAlertModalForNullEl('main');
      return;
    }

    $main.appendChild($section);
    new MoreButton({ listType, isShowMoreButton: movieData.isShowMoreButton });
  };
}

export default MovieListContainer;
