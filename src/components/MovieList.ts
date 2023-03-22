import { MovieType } from '../types';
import { $, $$ } from '../utils/domSelector';
import MovieItem from './MovieItem';
import skeletonItem from './skeletonItem';
import errorLayout from './errorLayout';
import LoadMoreObserver from './LoadMoreObserver';
import EventBus from '../EventBus';

type ErrorLayoutConstructorType = {
  image: string;
  title: string;
  message: string;
};

type MovieListConstructorType = {
  parentElement: HTMLElement;
  listTitle: string;
};

class MovieList {
  private $parentElement;
  private $element!: HTMLElement;
  private loadMoreObserver = new LoadMoreObserver();

  constructor({ parentElement, listTitle }: MovieListConstructorType) {
    this.$parentElement = parentElement;
    this.render(listTitle);
    this.addMovieItemClickListener();
  }

  private render(listTitle: string) {
    this.$element = document.createElement('div');

    this.$element.innerHTML = `
      <h2>${listTitle}</h2>
      <ul class="item-list"></ul>`;

    this.$parentElement.appendChild(this.$element);
  }

  setTitle(listTitle: string) {
    $('h2', this.$element).textContent = listTitle;
  }

  showErrorMessage({ image, title, message }: ErrorLayoutConstructorType) {
    $('.item-list', this.$element).innerHTML = errorLayout.getTemplate({ image, title, message });
  }

  clearItems() {
    $('.item-list', this.$element).innerHTML = '';
  }

  renderSkeletonItems(count: number = 20) {
    const skeletonItems = skeletonItem().repeat(count);
    $('.item-list', this.$element).insertAdjacentHTML('beforeend', skeletonItems);
  }

  removeSkeletonItems() {
    $$('.skeleton-item:not(.occupied)', this.$element).forEach((skeleton) => {
      skeleton.remove();
    });
  }

  renderContents(movieInfoList: MovieType[]) {
    const skeletons = $$('.skeleton-item', this.$element);

    movieInfoList.forEach((movieInfo, index) => {
      skeletons[index].classList.add('occupied');
      const movieItem = new MovieItem({
        parentElement: $('.item-list', this.$element),
        skeleton: skeletons[index],
        movieInfo: movieInfo,
      });

      if (index === movieInfoList.length - 1) {
        this.loadMoreObserver.selectObservingElement(movieItem.getItemElement());
      }
    });
  }

  addMovieItemClickListener() {
    this.$element.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const selectedCard = event.target.closest('.item-card');

      if (selectedCard) {
        const movieItemId = Number(selectedCard.getAttribute('movie-id'));
        EventBus.triggerEvent('openInfoModal', [movieItemId]);
      }
    });
  }
}

export default MovieList;
