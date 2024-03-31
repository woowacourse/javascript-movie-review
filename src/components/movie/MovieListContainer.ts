import { ListType, Movie, MovieData } from '../../type/movie';
import { createElementWithAttribute, ElementFinder } from '../../utils';

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
    const $main = ElementFinder.findElementBySelector('main');
    if (!$main) return;
    const $section = this.#makeSection({
      ...props,
      ...props.movieData,
    });

    $main.appendChild($section);
    // 스크롤 후, 영화 검색 또는 로고를 눌러 인기 영화 리스트로 변경  시 스크롤을 최상단으로 변경
    window.scrollTo({ top: 0 });
  };
}

export default MovieListContainer;
