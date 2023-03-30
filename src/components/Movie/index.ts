import { MovieInfo, MovieInfoByKeyword } from '../../types/api';
import { assemble, Event } from '../../core';
import { getElement, $ } from './../../utils/common/domHelper';
import { useState } from '../../core';

export interface MovieProps {
  info: MovieInfo | MovieInfoByKeyword;
  handleModalData(modalData: MovieInfo | MovieInfoByKeyword): void;
  handleIsVisibleModal(isVisible: boolean): void;
}

const Movie = assemble<MovieProps>(({ info, handleModalData, handleIsVisibleModal }) => {
  const { poster_path, title, vote_average, id } = info;

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        e.preventDefault();

        history.state ?? history.pushState('modal', '', `info`);
        history.replaceState('modal', '', `info`);

        handleModalData(info);
        handleIsVisibleModal(true);
        if ($(`li[data="id=${id}"]`)) console.log($(`li[data="id=${id}"]`));
      },
    },
  ];
  const $template = getElement(`
      <li data=id=${id}>
        <a href="#">
          <div class="item-card movie">
            <img
              class="item-thumbnail"
              src=https://image.tmdb.org/t/p/w200/${poster_path}
              loading="lazy"
              alt=${title}
            />
              <p class="item-title">${title}</p>
            <div class="item-score-container">
              <img src="./star_filled.png" alt="별점" />
              <p class="item-score">${vote_average}</p>
            </div>
          </div>
        </a>
    </li>
  `);

  return [$template, $events];
});

export { Movie };
