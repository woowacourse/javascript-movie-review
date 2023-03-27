import { $, Event } from '../utils/index';
import MovieData from '../data/MovieData';
import { printMovieDetail } from './MovieInfoModal';
import { showStar } from './UserScoreStar';

export function ItemList() {
  Event.addEvent('click', '.item-list', (event) => {
    const target = event.target as HTMLElement;
    const targetId = Number(target.closest('li')?.id);
    const targetMovie = MovieData.findMovie(targetId) ?? null;
    const targetUserScore = MovieData.findUserScore(targetId);
    const infoDialogElem = $('.modal-movie-info') as HTMLDialogElement;

    printMovieDetail(infoDialogElem, targetMovie!, targetUserScore);
    showStar(targetUserScore);

    infoDialogElem.showModal();
  });

  return `
  <ul class="item-list">
  </ul>`;
}
