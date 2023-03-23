import template from './index.html';
import { Movie } from '../../types';

export class MovieList extends HTMLElement {
  #$movieItems: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.#$movieItems = this.querySelector('.item-list')!;
  }

  setTitle(title: string) {
    const pageTitle = this.querySelector('.page-title');
    if (pageTitle !== null) pageTitle.innerHTML = title;
  }

  renderMovies(movieList: Movie[]) {
    this.#insertMovieList(movieList);
  }

  renderSearchedMovies(movieList: Movie[]) {
    this.#$movieItems.replaceChildren();
    this.#insertMovieList(movieList);
  }

  #insertMovieList(movieList: Movie[]) {
    if (movieList.length === 0) {
      this.#$movieItems?.insertAdjacentHTML(
        'beforeend',
        `<img src="./assets/empty.png" width="1200px"/>`,
      );
    }
    movieList.map((movie: Movie) => {
      const { id, title, poster_path, vote_average, genre_ids, overview } = movie;
      this.#$movieItems?.insertAdjacentHTML(
        'beforeend',
        `<movie-item id=${id} title=${`"${title}"`} poster=${poster_path} vote=${vote_average} genre=${genre_ids} overview=${`"${overview}"`}></movie-item>`,
      );
    });
  }

  modalHandler(open: CallableFunction, setInformationToModal: CallableFunction) {
    const a = this.querySelector('ul');

    a?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      const targetParent = target.parentElement as HTMLTextAreaElement;

      if (targetParent.id) open();
      setInformationToModal(targetParent);
    });
  }
}
