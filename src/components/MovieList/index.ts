import template from './index.html';
import { Movie } from '../../types';
import { $$ } from '../../utils/Dom';

export class MovieList extends HTMLElement {
  #$movieItems: HTMLElement;
  #$li: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.#$movieItems = $$('.item-list', HTMLUListElement, this);
    this.#$li = $$('ul', HTMLUListElement);
  }

  setTitle(title: string) {
    const pageTitle = this.querySelector('.page-title');
    if (pageTitle !== null) pageTitle.innerHTML = title;
  }

  renderMovies(movieList: Movie[], genre: Array<{ id: number; name: string }>) {
    this.insertMovieList(movieList, genre);
  }

  renderSearchedMovies(movieList: Movie[], genre: Array<{ id: number; name: string }>) {
    this.#$movieItems.replaceChildren();
    this.insertMovieList(movieList, genre);
  }

  private insertMovieList(movieList: Movie[], genre: Array<{ id: number; name: string }>) {
    if (movieList.length === 0) {
      this.#$movieItems?.insertAdjacentHTML(
        'beforeend',
        `<img src="./assets/empty.png" class="fail" style="position: absolute; top: 50%;
        left: 50%; width:90vw; transform: translateX(-50%) translateY(-50%);"/>`,
      );
    }
    movieList.map((movie: Movie) => {
      const { id, title, poster_path, vote_average, genre_ids, overview } = movie;
      const genreName = this.matchGenre(genre, genre_ids);
      this.#$movieItems?.insertAdjacentHTML(
        'beforeend',
        `<movie-item id=${id} title=${`"${title}"`} poster=${poster_path} vote=${vote_average} genre=${genreName} overview=${`"${overview}"`}></movie-item>`,
      );
    });
  }

  matchGenre(genre: Array<{ id: number; name: string }>, genre_ids: number[]) {
    return genre
      .filter((itemGenre) => genre_ids.includes(itemGenre.id))
      .map((itemGenre) => itemGenre.name);
  }

  modalHandler(
    open: CallableFunction,
    setInformationToModal: CallableFunction,
    eventBind: CallableFunction,
  ) {
    const tag = this.querySelector('ul');

    tag?.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      const targetParent = target.parentElement as HTMLTextAreaElement;

      if (targetParent.id) open();
      setInformationToModal(targetParent);
      eventBind();
    });
  }

  infiniteScroll = (moreButtonHandler: CallableFunction) => {
    this.#$li = $$('movie-item:last-of-type', HTMLElement, this);
    const io = new IntersectionObserver(
      async (entry) => {
        if (entry[0].isIntersecting) {
          io.unobserve(this.#$li);
          await moreButtonHandler();
          this.#$li = $$('movie-item:last-of-type', HTMLElement, this);
          io.observe(this.#$li);
        }
      },
      {
        threshold: 1,
        rootMargin: '-50px 0px',
      },
    );

    io.observe(this.#$li);
  };
}
