import { NewMovie } from '../states/NewMovie';
import MovieListItem from './MovieListItem';

export class MovieList {
  private section = document.createElement('section');

  constructor(private readonly title: string, private readonly newMovie: NewMovie) {
    this.section.classList.add('item-view');
    this.section.innerHTML = `
      <h2>${this.title}</h2>
      <ul class="item-list"><hr></ul>
      <button class="btn primary full-width">더 보기</button>
      <h3>결과가 없습니다</h3>
    `.trim();

    this.section.querySelector('button')!.addEventListener('click', () => {
      this.nextPage();
    });

    this.newMovie.subscribe((movieSubject) => {
      this.section.querySelector('ul')!.append(new MovieListItem(movieSubject).render());
    });

    this.newMovie.fetchNextPage().then(() => this.nextPage());
  }

  render() {
    return this.section;
  }

  private nextPage() {
    this.newMovie.fetchNextPage();

    const $hr = this.section.querySelector('ul > hr')!;

    const $anchor: HTMLElement = Array(20)
      .fill(undefined)
      .reduce((acc) => acc?.nextSibling ?? acc, $hr);

    $anchor?.after($hr);
  }
}
