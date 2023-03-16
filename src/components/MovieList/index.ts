import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { MovieComponent } from './action';
import { MovieInfo, MovieInfoByKeyword } from '../../apis';

export interface MovieListProps {
  movieList: MovieInfo[] | MovieInfoByKeyword[];
}

const MovieList = assemble<MovieListProps>((props) => {
  const { movieList } = props;

  const $events: Event[] = [];
  const $template = getElement(`
        <ul class="item-list">
        ${movieList
          .map(
            (info) => `
          <fragment id="Movie-${info.id}">
            ${MovieComponent({ info })}
          </fragment>`
          )
          .join('')}
        </ul>
  `);

  return [$template, $events];
});

export { MovieList };
