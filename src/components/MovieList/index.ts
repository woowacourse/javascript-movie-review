import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { MovieComponent } from './action';
import { MovieInfo, MovieInfoByKeyword } from '../../types/api';
export interface MovieListProps {
  movieList: MovieInfo[] | MovieInfoByKeyword[];
  handleModalData(modalData: MovieInfo): void;
  handleIsVisibleModal(isVisible: boolean): void;
}

const MovieList = assemble<MovieListProps>((props) => {
  const { handleModalData, handleIsVisibleModal, movieList } = props;

  const $events: Event[] = [];
  const $template = getElement(`
        <ul class="item-list">
        ${movieList
          .map(
            (info) => `
          <fragment id="Movie-${info.id}">
            ${MovieComponent({ handleModalData, handleIsVisibleModal, info })}
          </fragment>`
          )
          .join('')}
        </ul>
  `);

  return [$template, $events];
});

export { MovieList };
