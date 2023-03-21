import { NewMovie } from '../states/NewMovie';
import MovieListItem from './MovieListItem';
import { Toast } from './Toast';

export class MovieList {
  private readonly $root = document.createElement('section');

  constructor(private readonly title: string, private readonly newMovie: NewMovie) {
    this.$root.classList.add('item-view');
    this.$root.innerHTML = `
      <h2>${this.title}</h2>
      <ul class="item-list"><hr></ul>
      <button class="btn primary full-width">더 보기</button>
      <h3>결과가 없습니다</h3>
    `.trim();

    this.$root.querySelector('button')!.addEventListener('click', () => {
      this.nextPage();
    });

    this.newMovie.subscribe((movieSubject) => {
      this.$root.querySelector('ul')!.append(new MovieListItem(movieSubject).getRoot());
    });

    this.newMovie.subscribeError((error) => Toast.create(error.message));

    this.newMovie.fetchNextPage().then(() => this.nextPage());
  }

  getRoot() {
    return this.$root;
  }

  private nextPage() {
    this.newMovie.fetchNextPage();

    const $hr = this.$root.querySelector('ul > hr')!;

    const $anchor: HTMLElement = Array(20)
      .fill(undefined)
      .reduce((acc) => acc?.nextSibling ?? acc, $hr);

    $anchor?.after($hr);
  }
}
