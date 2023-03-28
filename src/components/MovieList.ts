import MovieCard from './MovieCard';
import skeletonTemplate from './Skeleton';
import Component from '../types/component';

import { Movie, MovieItem } from '../types/movie';
import { NULL_SEARCH_RESULT_MESSAGE } from '../constants/messages';
import { POPULAR_LIST_NAME } from '../constants/listNames';
import ErrorModal from './MovieDetail/ErrorModal';

class MovieList implements Component {
  readonly node: HTMLElement;

  private listName!: HTMLParagraphElement;
  private movieList!: HTMLUListElement;
  private skeletonList!: HTMLUListElement;
  private loadMoreButton!: HTMLButtonElement;

  private children: { movieCardList: MovieCard[] } = {
    movieCardList: [],
  };

  constructor() {
    this.node = document.createElement('section');
    this.node.classList.add('item-view');

    this.composeNode().setElements().addEvents().observeMovieList();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <h2 id="list-name">${POPULAR_LIST_NAME}</h2>
      <ul class="item-list movie-list hidden"></ul>
      <ul class="item-list skeleton-list">${skeletonTemplate()}</ul>
      
      <button class="load-more-button btn primary full-width">더 보기</button>`;

    return this;
  }

  setElements(): this {
    const listName = this.node.querySelector<HTMLParagraphElement>('#list-name');
    const movieList = this.node.querySelector<HTMLUListElement>('.movie-list');
    const skeletonList = this.node.querySelector<HTMLUListElement>('.skeleton-list');
    const loadMoreButton = this.node.querySelector<HTMLButtonElement>('.btn');

    if (!(movieList && loadMoreButton && listName && skeletonList)) {
      return this;
    }

    this.movieList = movieList;
    this.loadMoreButton = loadMoreButton;
    this.listName = listName;
    this.skeletonList = skeletonList;

    return this;
  }

  showSkeleton(): this {
    this.skeletonList.classList.remove('hidden');

    return this;
  }

  hideSkeleton(): this {
    this.skeletonList.classList.add('hidden');

    return this;
  }

  showMovieList(): this {
    this.movieList.classList.remove('hidden');

    return this;
  }

  hideMovieList(): this {
    this.movieList.classList.add('hidden');

    return this;
  }

  showMoreButton(): this {
    this.loadMoreButton.classList.remove('hidden');

    return this;
  }

  hideMoreButton(): this {
    this.loadMoreButton.classList.add('hidden');

    return this;
  }

  updateMovieList(movieDetails: MovieItem[], isLastPage: Boolean): this {
    if (movieDetails.length === 0) {
      this.hideSkeleton().hideMoreButton().showMessage(NULL_SEARCH_RESULT_MESSAGE);
      new ErrorModal(NULL_SEARCH_RESULT_MESSAGE).show();
      return this;
    }

    this.hideSkeleton().showMovieList().showMoreButton();
    this.movieList.append(this.createMovieCards(movieDetails));

    this.loadMoreButton.disabled = isLastPage ? true : false;

    return this;
  }

  createMovieCards(movieDetails: MovieItem[]): DocumentFragment {
    return movieDetails
      .map(movie => {
        const movieCard = new MovieCard(movie);
        this.children.movieCardList.push(movieCard);
        return movieCard;
      })
      .reduce((acc: DocumentFragment, cur) => {
        acc.appendChild(cur.node);
        return acc;
      }, new DocumentFragment());
  }

  removeMessage(): this {
    const emptyMessage = this.node.querySelector('.message');
    if (emptyMessage) emptyMessage.remove();

    return this;
  }

  showMessage(message: string): this {
    this.movieList.insertAdjacentHTML('afterend', `<div class="message">${message}</div>`);

    return this;
  }

  setListName(listName: string): this {
    this.listName.innerText = listName;

    return this;
  }

  cleanMovieList(): this {
    this.children.movieCardList = [];
    this.movieList.innerHTML = '';
    this.removeMessage();

    return this;
  }

  addEvents(): this {
    this.loadMoreButton.addEventListener('click', this.#handleClickMoreButton.bind(this));

    return this;
  }

  #handleClickMoreButton(): void {
    this.node.dispatchEvent(new CustomEvent('click-more-button', { bubbles: true }));
  }

  observeMovieList(): this {
    const options = {
      root: null,
      rootMargin: '50%',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(this.#handleIntersect.bind(this), options);
    observer.observe(this.loadMoreButton);

    return this;
  }

  #handleIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) this.loadMoreButton.click();
    });
  }
}

export default MovieList;
