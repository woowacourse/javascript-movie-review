import { Movie } from '../movies.type';
import { TMDBErrorResponse, TMDBResponse } from '../response.type';
import store from '../store';
import { infiniteScroll } from '../util/InfiniteScroll';
import { getLocalStorage } from '../util/LocalStorage';
import DetailModal from './DetailModal';
import ErrorPopup from './ErrorPopup';
import MovieListItem from './MovieListItem';
import Skeleton from './Skeleton';

export type MoviesGenerator = (page: number) => Promise<TMDBResponse>;

export class MovieList {
  private isFinished = false;

  private page = 1;

  private section = document.createElement('section');

  constructor(private readonly fetchFn: MoviesGenerator, private readonly title: string) {
    this.section.classList.add('item-view');
    this.section.innerHTML = `
      <h2>${this.title}</h2>
      <ul class="item-list"></ul>
      <h3>입력하신 검색어 ${this.title}와 일치하는 결과가 없습니다.</h3>
    `;

    this.init();
  }

  async init() {
    await this.nextPage();
    this.showModal();
    try {
      infiniteScroll('li:nth-last-child(5)', this.nextPage);
    } catch (e) {
      console.log('텅');
    }
  }

  render() {
    return this.section;
  }

  private createSkeletons = () => {
    if (this.isFinished) return;

    const skeleton = new Skeleton();
    [...Array(20)].forEach(() => {
      this.section.querySelector('ul')?.insertAdjacentHTML('beforeend', skeleton.render());
    });
  };

  private async load() {
    if (this.isFinished) return;

    const page = this.page;
    this.page += 1;

    try {
      const response: TMDBResponse = await this.fetchFn(page);

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const movies = response.results;
      store.setMovies(movies);
      const totalPages = response.total_pages;

      this.replaceSkeleton(page, movies);
      if (page < totalPages) return;

      this.isFinished = true;
    } catch (e) {
      const error = e as Error | TMDBErrorResponse;
      this.createSkeletons();

      const errorMessage = this.getErrorMessage(error);
      const errorPopup = new ErrorPopup();
      errorPopup.pop(errorMessage);
    }
    this.removeSkeleton();
  }

  private getErrorMessage(error: Error | TMDBErrorResponse) {
    // eslint-disable-next-line no-nested-ternary
    return 'message' in error
      ? error.message
      : 'status_message' in error
      ? error.status_message
      : String(error);
  }

  private replaceSkeleton(page: number, movies: Movie[]) {
    movies.forEach((movie: Movie) => {
      const movieListItem = new MovieListItem(movie);
      const $div = document.createElement('div');
      $div.insertAdjacentElement('beforeend', movieListItem.render());

      ($div.childNodes[0] as HTMLElement).setAttribute('page', String(page));
      const $skeleton = this.section.querySelector('ul > li.skeleton') as HTMLLIElement;
      $skeleton.after($div.childNodes[0]);
      $skeleton.remove();
    });
  }

  private removeSkeleton = () => {
    this.section
      .querySelectorAll<HTMLLIElement>('ul > li.skeleton')
      .forEach(($skeleton: HTMLLIElement) => {
        $skeleton.remove();
      });
  };

  nextPage = async () => {
    this.createSkeletons();
    await this.load();
  };

  showModal() {
    document.querySelector('.item-view')?.addEventListener('click', (e) => {
      const id = (e.target as HTMLLIElement).closest('.item-card')?.id;
      if (id) {
        (document.querySelector('.modal') as HTMLDialogElement).showModal();
        const rate = getLocalStorage(String(id));
        return typeof rate === 'object'
          ? new DetailModal(store.getMovie(Number(id)) as Movie)
          : new DetailModal(store.getMovie(Number(id)) as Movie, rate);
      }
      return null;
    });
  }
}
