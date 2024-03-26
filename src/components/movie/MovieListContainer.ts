import { renderAlertModalForNullEl } from '../../service';
import { ListType, Movie, MovieData } from '../../type/movie';
import { createElementWithAttribute } from '../../utils';

import MovieList from './MovieList';
import MovieListTitle from './MovieListTitle';

export interface MovieListContainerProps {
  titleText: string;
  movieData: MovieData;
  listType: ListType;
}

interface SectionProps {
  titleText: string;
  movieList: Movie[] | undefined;
  listType: ListType;
  isMoreData: boolean;
}
class MovieListContainer {
  constructor(props: MovieListContainerProps) {
    this.#renderMovieListContainer(props);
  }

  #makeSection = (props: SectionProps) => {
    const { titleText, movieList, listType, isMoreData } = props;
    const $section = createElementWithAttribute('section', {
      class: 'movie-list-container',
      name: listType,
    });
    $section.appendChild(new MovieListTitle(titleText).element);
    $section.appendChild(new MovieList(movieList, isMoreData).element);

    return $section;
  };

  #renderMovieListContainer = (props: MovieListContainerProps) => {
    const $main = document.querySelector('main');
    const $section = this.#makeSection({
      ...props,
      ...props.movieData,
    });
    if (!$main) {
      renderAlertModalForNullEl('main');
      return;
    }
    $main.appendChild($section);
  };
}

export default MovieListContainer;
