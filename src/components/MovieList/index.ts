import template from './index.html';
import { Movie } from '../../types';

export class MovieList extends HTMLElement {
  #$movieItems: HTMLElement;
  #$li: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.#$movieItems = <HTMLDivElement>this.querySelector('.item-list');
    this.#$li = <HTMLUListElement>document.querySelector('.ul');
  }

  setTitle(title: string) {
    const pageTitle = this.querySelector('.page-title');
    if (pageTitle !== null) pageTitle.innerHTML = title;
  }

  renderMovies(movieList: Movie[], genre: Array<{ id: number; name: string }>) {
    this.#insertMovieList(movieList, genre);
  }

  renderSearchedMovies(movieList: Movie[], genre: Array<{ id: number; name: string }>) {
    this.#$movieItems.replaceChildren();
    this.#insertMovieList(movieList, genre);
  }

  #insertMovieList(movieList: Movie[], genre: Array<{ id: number; name: string }>) {
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
    const newGenre: string[] = [];
    genre.forEach((itemGenre: { id: number; name: string }) => {
      genre_ids.forEach((id: number) => {
        if (itemGenre.id === id) newGenre.push(itemGenre.name);
      });
    });
    return newGenre;
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
    this.#$li = this.querySelector('movie-item:last-of-type')!;
    const io = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          io.unobserve(this.#$li);
          moreButtonHandler();
          setTimeout(() => {
            this.#$li = this.querySelector('movie-item:last-child')!;
            console.log(this.querySelectorAll('movie-item').length);
            console.log(this.#$li);
            io.observe(this.#$li);
          }, 500);
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
