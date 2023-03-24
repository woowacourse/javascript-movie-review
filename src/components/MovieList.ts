import { NewMovieSubject } from '../states/domain/NewMovieSubject';
import { $context } from '../utils/selector';
import { MovieListItem } from './MovieListItem';
import { Toast } from './Toast';

export type MovieListProps = {
  title: string;
  newMovie$: NewMovieSubject;
  autoNextPage?: boolean;
};

export class MovieList {
  private readonly $root = document.createElement('section');

  private readonly $ = $context(this.$root);

  private readonly title: string;

  private readonly newMovie$: NewMovieSubject;

  constructor({ title, newMovie$, autoNextPage = true }: MovieListProps) {
    this.title = title;
    this.newMovie$ = newMovie$;

    this.$root.classList.add('item-view');
    this.$root.innerHTML = `
      <h2>${this.title}</h2>
      <ul class="item-list"><hr class="item-slider"></ul>
      <button class="btn primary full-width">더 보기</button>
      <h3>결과가 없습니다</h3>
    `.trim();

    this.$('button').addEventListener('click', () => {
      this.nextPage();
    });

    this.newMovie$.subscribe((movie$) => {
      this.$('ul').append(new MovieListItem({ movie$ }).getRoot());
    });
    this.newMovie$.subscribeError((error) => Toast.create(error.message));
    this.newMovie$.fetchNextPage().then(() => this.nextPage());

    if (autoNextPage) {
      new IntersectionObserver(
        () => {
          this.nextPage(); // NOTE: 두 번씩 호출되나 의도된 동작
        },
        {
          threshold: 0,
          rootMargin: '1200px 0px',
        },
      ).observe(this.$('button'));
    }
  }

  getRoot() {
    return this.$root;
  }

  private nextPage() {
    this.newMovie$.fetchNextPage();

    const $hr = this.$('ul > hr');
    const $anchor: HTMLElement = Array(20)
      .fill(undefined)
      .reduce((acc) => acc?.nextSibling ?? acc, $hr);

    $anchor?.after($hr);
  }
}
