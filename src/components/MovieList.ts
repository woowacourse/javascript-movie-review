import MovieCard from './MovieCard';
import skeletonTemplate from './Skeleton';
import Component from '../types/component';
import { FetchType } from '../types/fetcherType';
import { Movie, MovieItem } from '../types/movie';
import { NULL_SEARCH_RESULT_MESSAGE } from '../constants/messages';

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

    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <h2 id="list-name">지금 인기있는 영화</h2>
      <ul class="item-list movie-list hidden"></ul>
      <ul class="item-list skeleton-list">${skeletonTemplate()}</ul>
      
      <button class="btn primary full-width hidden">더 보기</button>`;

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

  showButton(): this {
    this.loadMoreButton.classList.remove('hidden');

    return this;
  }

  hideButton(): this {
    this.loadMoreButton.classList.add('hidden');

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

  updateMovieList(movieDetails: MovieItem[], isLastPage: Boolean): this {
    if (movieDetails.length === 0) {
      this.hideSkeleton().hideButton().showMessage(NULL_SEARCH_RESULT_MESSAGE);
      return this;
    }

    this.hideSkeleton().showMovieList();
    this.movieList.append(this.createMovieCards(movieDetails));

    isLastPage ? this.hideButton() : this.showButton();

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
    if (this.loadMoreButton.disabled) return;

    this.node.dispatchEvent(new CustomEvent('click-more-button', { bubbles: true }));
    this.loadMoreButton.disabled = true;

    setTimeout(() => {
      this.loadMoreButton.disabled = false;
    }, 2000);
  }
}

export default MovieList;
