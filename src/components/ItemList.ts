import { $, Event } from '../utils/index';
import MovieData from '../data/MovieData';
import { printMovieDetail } from './MovieInfoModal';
import { showStar } from './UserScoreStar';

export function ItemList() {
  Event.addEvent('click', '.item-list', (event) => {
    const target = event.target as HTMLElement;
    const targetId = Number(target.closest('li')?.id);
    const infoDialogElem = $('.modal-movie-info') as HTMLDialogElement;

    const targetMovie = MovieData.findMovie(targetId) ?? null;
    const targetUSerScore = MovieData.findUserScore(targetId);

    printMovieDetail(infoDialogElem, targetMovie!, targetUSerScore);
    showStar(targetUSerScore);

    infoDialogElem.showModal();
  });

  return `
  <ul class="item-list">
  </ul>`;
}
