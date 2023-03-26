import { $, Event } from '../utils/index';
import MovieData from '../data/MovieData';
import { printMovieDetail } from './MovieInfoModal';

export function ItemList() {
  Event.addEvent('click', '.item-list', (event) => {
    const target = event.target as HTMLElement;
    const targetId = target.closest('li')?.id;
    const infoDialogElem = $('.modal-movie-info') as HTMLDialogElement;

    const targetMovie = MovieData.findMovie(Number(targetId)) ?? null;
    const targetUSerScore = MovieData.findUserScore(Number(targetId));

    infoDialogElem.children[0].children[0].textContent = targetMovie?.title ?? null;
    infoDialogElem.children[1].innerHTML = printMovieDetail(
      targetMovie!,
      targetUSerScore?.movieScore
    );
    console.log(infoDialogElem.children);

    infoDialogElem.showModal();
  });

  return `
  <ul class="item-list">
  </ul>`;
}
