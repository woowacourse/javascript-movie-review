import { MoviesErrorResponse, MoviesResponse } from '../api/apis/MoviesAPI';

import MovieListItem from './MovieListItem';
import Skeleton from './Skeleton';
import { Toast } from './Toast';

export type MoviesGenerator = (page: number) => Promise<MoviesResponse>;

export class MovieList {
  private isFinished = false;

  private page = 1;

  private section = document.createElement('section');

  private skeletons: Skeleton[] = [];

  constructor(private readonly fetchFn: MoviesGenerator, private readonly title: string) {
    this.section.classList.add('item-view');
    this.section.innerHTML = `
      <h2>${this.title}</h2>
      <ul class="item-list"><hr></ul>
      <button class="btn primary full-width">더 보기</button>
      <h3>결과가 없습니다</h3>
    `.trim();
    this.init();

    this.section.querySelector('button')!.addEventListener('click', () => {
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

    const skeletons = [...Array(20)].map(() => new Skeleton());
    this.skeletons = this.skeletons.concat(skeletons);

    this.section.querySelector('ul')!.append(...skeletons.map((skeleton) => skeleton.render()));
  }

  private async load() {
    if (this.isFinished) return;

    const page = this.page;
    this.page += 1;

    try {
      const response = await this.fetchFn(page);
      const { movies, totalPages } = response;

      movies.forEach((movie) => {
        const movieListItem = new MovieListItem(movie);

        const skeleton = this.skeletons.shift();
        if (skeleton === undefined) {
          this.section.append(movieListItem.render());
          return;
        }

        movieListItem.thumbnailLoaded.then(() => {
          skeleton.unwrap(movieListItem.render());
        });
      });

      if (page < totalPages) return;

      this.isFinished = true;
    } catch (e) {
      console.error(e);
      const error = e as Error | MoviesErrorResponse;
      this.createSkeletons();
      const $popup = document.createElement('div');
      $popup.classList.add('popup');

      const errorMessage = 'message' in error ? error.message : String(error);
      Toast.create(errorMessage);
    }
    this.skeletons.forEach((skeleton) => skeleton.remove());
  }

  private showItems() {
    const $hr = this.section.querySelector('ul > hr')!;

    const $anchor: HTMLElement = Array(20)
      .fill(undefined)
      .reduce((acc) => acc?.nextSibling ?? acc, $hr);

    $anchor?.after($hr);
  }

  async nextPage() {
    this.createSkeletons();
    this.showItems();
    await this.load();
  }
}
