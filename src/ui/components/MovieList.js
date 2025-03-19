import Movie from '../../domain/models/Movie.ts'

export default class MovieList {
  constructor(containerSelector, moviesData, currentPage, totalPage) {
    this.container = document.querySelector(containerSelector);
    this.moviesData = moviesData;
  }

  init() { }

  loadInitMovie() {
    this.moviesData.forEach(movieData => {
      const movie = new Movie(movieData);
      // console.log(movie)

      const renderedElement = movie.render();
      console.log(renderedElement); // 반환된 값 확인
      console.log(renderedElement instanceof HTMLElement); // true여야 함
      // this.container.appendChild(renderedElement);

      this.container.appendChild(movie.render());
    });
  }

  addLoadMoreButton() { }

  async loadMoreMovies() { }
}
