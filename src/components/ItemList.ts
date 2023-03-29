import { $, Event } from '../utils/index';
import MovieData from '../data/MovieData';
import { printMovieDetail } from './MovieInfoModal';
import { showStar } from './ScoreStar';

export function ItemList() {
  Event.addEvent('click', '.item-list', (event) => {
    const target = event.target as HTMLElement;
    const targetId = Number(target.closest('li')?.id);
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
