import { assemble, Event, useEffect, useState } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent, ModalComponent, ModalComponentNone } from './action';
import { useMovieChart } from '../../hooks/useMovieChart';
import { MovieProps } from '../Movie';
import { MovieInfo, MovieInfoByKeyword } from '../../types/api';
import { entries } from 'cypress/types/lodash';

interface MovieChart {
  keyword: string;
}
let page: number;
const MovieChart = assemble<MovieChart>(({ keyword }) => {
  const { chartInfo, movieList, isLoading, subtitle, isLastPage, fetchMore } = useMovieChart(keyword);
  const [modalData, setModalData] = useState<MovieInfo | MovieInfoByKeyword>();
  const [isVisibleModal, setisVisibleModal] = useState<boolean>(false);

  const handleModalData = (modalData: MovieInfo) => {
    setModalData(modalData);
  };

  const handleIsVisibleModal = (isVisible: boolean) => {
    setisVisibleModal(isVisible);
  };

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        if (e.target === $('.btn.primary')) fetchMore(keyword);
      },
    },
  ];

  const intersectionObserver = new IntersectionObserver(function (entries) {
    if (isLoading || isLastPage) return;
    if (entries[0].intersectionRatio <= 0) return;

    fetchMore(keyword);
  });

  setTimeout(() => {
    intersectionObserver.observe($('.btn.primary')!);
  }, 0);

  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>${subtitle}</h2>
        <fragment id='MovieList'>
          ${chartInfo ? MovieListComponent({ handleModalData, handleIsVisibleModal, movieList }) : ''}
        </fragment>
        <fragment id='SkeletonList'>
        ${isLoading ? SkeletonMovieListComponent() : ''}
        </fragment>
        <div class="btn primary full-width" ${chartInfo?.page === 500 ? 'disabled' : ''}>
        </div>
        <fragment id='Modal'>
          ${isVisibleModal ? ModalComponent({ handleIsVisibleModal, modalData }) : ModalComponentNone()}
        </fragment>
      </section>
      </main>
      `);

  return [$template, $events];
});

export { MovieChart };
