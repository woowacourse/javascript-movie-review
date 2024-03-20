import MovieContainer from '../component/MovieContainer.js';
import MovieService from '../domain/MovieService.ts';
import createHeader from '../component/Header.js';
import PageNumberManager from '../domain/pageNumberManager.ts';

export class App {
  #searchKeyword;
  #pageNumberManager;
  #movieService;
  #movieContainer;

  constructor() {
    this.#searchKeyword = '';

    this.#pageNumberManager = new PageNumberManager();
    this.#pageNumberManager.init('popular');
    this.#pageNumberManager.init('search');

    this.#movieService = new MovieService();
    this.#movieContainer = new MovieContainer({
      title: '으어어',
      handleMoreButton: () => this.addMovieList(),
    });
  }

  async init() {
    createHeader();
    await this.addMovieList();
  }

  async addMovieList() {
    const movieList = await this.fetchMovieList();
    this.#movieContainer.replaceSkeletonListToData(movieList);
  }

  async fetchMovieList() {
    if (this.#searchKeyword !== '') {
      const movieList = await this.#movieService.fetchSearchResult(this.#pageNumberManager.get('search'));
      this.#pageNumberManager.add('search');
      this.#pageNumberManager.clear('popular');

      return movieList;
    }
    const movieList = await this.#movieService.fetchPopularMovieList(this.#pageNumberManager.get('popular'));
    this.#pageNumberManager.add('popular');
    this.#pageNumberManager.clear('search');

    return movieList;
  }
}

// export async function ss() {
//   const movieContainer = new MovieContainer({
//     title: '안녕 ㅋ',
//     handleMoreButton: async () => {},
//   });

//   movieContainer.initHandleClickMoreButton(async () => {
//     const data = await movieService.fetchPopularMovieList(1);
//     movieContainer.replaceSkeletonListToData(data);
//   });

//   const movieService = new MovieService();

//   const data = await movieService.fetchPopularMovieList(1);
//   movieContainer.replaceSkeletonListToData(data);
// }
