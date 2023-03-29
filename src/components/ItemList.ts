import { $, Event } from '../utils/index';
import MovieData from '../data/movieData';
import { printMovieDetail } from './movieInfoModal';

export function itemList() {
  Event.addEvent('click', '.item-list', (event) => {
    const target = event.target as HTMLElement;
    const targetId = Number(target.closest('li')?.dataset['id']);
    const targetMovie = MovieData.findMovie(targetId) ?? null;
    const targetUserScore = MovieData.findUserScore(targetId) ?? 0;
    const infoDialogElem = $('.modal-movie-info') as HTMLDialogElement;

    printMovieDetail(targetMovie!, targetUserScore);

    infoDialogElem.showModal();
  });

  return `
  <ul class="item-list">
  </ul>`;
}
