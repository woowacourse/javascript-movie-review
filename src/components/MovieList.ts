import { TMDBErrorResponse, TMDBResponse } from '../client';
import { Movie } from '../movies.type';
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
      <ul class="item-list"><hr></ul>
      <button class="btn primary full-width">더 보기</button>
      <h3>결과가 없습니다</h3>
    `;
    this.init();

    this.section.querySelector('button')?.addEventListener('click', () => {
      this.nextPage();
    });
  }

  async init() {
    await this.nextPage();
    this.createSkeletons();
    this.load();
  }

  render() {
    return this.section;
  }

  private createSkeletons() {
    if (this.isFinished) return;

    const skeleton = new Skeleton();
    [...Array(20)].forEach(() => {
      this.section.querySelector('ul')?.insertAdjacentHTML('beforeend', skeleton.render());
    });
  }

  private async load() {
    if (this.isFinished) return;

    const page = this.page;
    this.page += 1;

    try {
      const response: TMDBResponse = await this.fetchFn(page);
      const { results: movies, total_pages: totalPages } = response;

      movies.forEach((movie: Movie) => {
        const movieListItem = new MovieListItem();
        const $fragment = document.createElement('div');
        $fragment.innerHTML = movieListItem.render(movie);

        ($fragment.childNodes[0] as HTMLElement).setAttribute('page', String(page));
        const $skeleton = this.section.querySelector('ul > li.skeleton')!;
        $skeleton.after($fragment.childNodes[0]);
        $skeleton.remove();
      });
      if (page < totalPages) return;

      this.isFinished = true;
    } catch (e) {
      console.error(e);
      const error = e as Error | TMDBErrorResponse;
      this.createSkeletons();
      const $popup = document.createElement('div');
      $popup.classList.add('popup');

      const errorMessage =
        // eslint-disable-next-line no-nested-ternary
        'message' in error
          ? error.message
          : 'status_message' in error
          ? error.status_message
          : String(error);

      $popup.innerText = errorMessage;
      document.querySelector('.popup-container')?.append($popup);

      setTimeout(() => {
        $popup.dataset.fadeOut = '';
        setTimeout(() => {
          $popup.remove();
        }, 1000);
      }, 5000);
    }
    this.section
      .querySelectorAll<HTMLLIElement>('ul > li.skeleton')
      .forEach(($skeleton: HTMLLIElement) => {
        $skeleton.remove();
      });
  }

  private reveal() {
    const $hr = this.section.querySelector('ul > hr')!;

    const $anchor: HTMLElement = Array(20)
      .fill(undefined)
      .reduce((acc) => acc?.nextSibling ?? acc, $hr);

    $anchor?.after($hr);
  }

  async nextPage() {
    this.createSkeletons();
    this.reveal();
    await this.load();
  }
}
