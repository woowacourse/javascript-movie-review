import './MovieList.css';
import { $, parsedFechedMovies, request } from '../../utils/common';
import Movies from '../../domain/Movies';

class MovieList extends HTMLElement {
  #pageIndex = 1;
  #movies = new Movies();
  #searchWord = new Proxy(
    { value: '' },
    {
      get: (target, property) => {
        return target[property];
      },

      set: (target, property, value) => {
        target[property] = value;
        this.resetMovieItem();

        this.showSkeletonItem();

        this.updateMovieList();
        this.updateTitle(value);

        return true;
      },
    }
  );

  connectedCallback() {
    this.renderContainer();
    this.updateMovieList();
    this.setButtonEvent();
  }

  renderContainer() {
    this.innerHTML = `
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
          <skeleton-item id="first-skeleton"></skeleton-item>
          ${'<skeleton-item></skeleton-item>'.repeat(19)}
        </ul>
        <common-button id="more-button" class="hide-button" text="더보기" color="primary"></common-button>
      </section>
    </main>`;
  }

  async updateMovieList() {
    try {
      this.#movies.update(await this.getMoviesFromApi(this.#searchWord.value));
      this.hideSkeletonItem();

      this.renderMovieList();
      this.toggleVisibleButton();
    } catch (error) {
      $('h2').innerText = error.message;
      $('#more-button').classList.add('hide-button');

      this.hideSkeletonItem();
    }
  }

  async getMoviesFromApi(searchWord) {
    const apiFetchingData = await (await request(searchWord, this.#pageIndex)).json();

    const fetchedMovies = apiFetchingData.results;

    if (apiFetchingData.total_pages > this.#pageIndex) {
      this.#pageIndex += 1;
    }

    const movies = parsedFechedMovies(fetchedMovies);

    return {
      isLastPage: apiFetchingData.total_pages === this.#pageIndex,
      movies,
    };
  }

  showSkeletonItem() {
    document.querySelectorAll('skeleton-item').forEach(node => {
      node.classList.remove('skeleton-hide');
    });
  }

  hideSkeletonItem() {
    document.querySelectorAll('skeleton-item').forEach(node => {
      node.classList.add('skeleton-hide');
    });
  }

  renderMovieList() {
    const movieResultState = this.#movies.movieResultState;

    if (movieResultState.movies.length === 0) {
      this.showNoResult();
      return;
    }

    $('#first-skeleton').insertAdjacentHTML('beforebegin', this.makeMovieListTemplate(movieResultState.movies));
  }

  showNoResult() {
    const noResultMessage = document.createElement('span');
    noResultMessage.innerText = '검색 결과가 없습니다';
    noResultMessage.classList.add('no-result');

    $('.item-list').appendChild(noResultMessage);
  }

  makeMovieListTemplate(movieList) {
    return movieList.reduce((acc, curr) => {
      return (
        acc +
        `<movie-item id="${curr.id}" title="${curr.title}" imgUrl="${curr.imgUrl}" score="${curr.score}"></movie-item>`
      );
    }, '');
  }

  toggleVisibleButton() {
    if (this.#movies.movieResultState.isLastPage) {
      $('#more-button').classList.add('hide-button');
      return;
    }

    $('#more-button').classList.remove('hide-button');
  }

  setButtonEvent() {
    $('#more-button').addEventListener('click', () => {
      document.querySelectorAll('skeleton-item').forEach(node => {
        node.classList.remove('skeleton-hide');
      });

      this.updateMovieList();
    });
  }

  resetMovieItem() {
    document.querySelectorAll('movie-item').forEach(node => node.remove());

    const noResultMessage = $('.item-list > span');

    if (noResultMessage) {
      noResultMessage.remove();
    }

    this.resetPageIndex();
  }

  resetPageIndex() {
    this.#pageIndex = 1;
  }

  updateTitle(word) {
    if (word === '') {
      $('h2').innerText = '지금 인기 있는 영화';
      return;
    }

    $('h2').innerText = `"${word}" 검색 결과`;
  }

  setSearchWord(searchWord) {
    this.#searchWord.value = searchWord;
  }
}

customElements.define('movie-list', MovieList);

export default MovieList;
