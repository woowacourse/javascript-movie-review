import MovieItem from '../movieItem/MovieItem';

class MovieListContainer {
  $target;

  constructor(movies: IMovie[]) {
    this.$target = document.createElement('ul');
    this.$target.classList.add('item-list');

    this.render();
    this.paint(movies);
  }

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  paint(movies: IMovie[]) {
    // 검색새로했을때 등
    this.$target.replaceChildren();
    this.attatch(movies);
  }

  attatch(movies: IMovie[]) {
    // 더보기 눌렀을때
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }
}

export default MovieListContainer;
