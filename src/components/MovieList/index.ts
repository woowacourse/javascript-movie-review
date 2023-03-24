import { RemoteMovieInfoByKeyword, RemotePopularMovieInfo } from '../../apis/movieChart.type';
import { assemble, Event } from '../../core';
import { Movie } from '../../domain/Movie';
import { getElement } from './../../utils/common/domHelper';
import { MovieComponent } from './action';

export interface MovieListProps {
  movieList: Movie[];
}

const MovieList = assemble<MovieListProps>((props) => {
  const { movieList } = props;

  const $events: Event[] = [];
  const $template = getElement(`
        <ul class="item-list">
        ${movieList
          .map(
            ({ movieInfo }) => `
          <fragment id="Movie-${movieInfo.id}">
            ${MovieComponent({ movieInfo })}
          </fragment>`
          )
          .join('')}
        </ul>
  `);

  return [$template, $events];
});

export { MovieList };
