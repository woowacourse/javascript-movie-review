import './MovieList.css';
import { $, parsedFechedMovies, request } from '../../utils/common';

class MovieList extends HTMLElement {
  #pageIndex = 1;
  #moviesData;
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
      </section>
    </main>`;
  }

  async updateMovieList() {
    try {
      await this.getMoviesFromApi(this.#searchWord.value);

      this.hideSkeletonItem();
      this.renderMovieList();

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);

              if (this.#moviesData.isInPageRange) {
                this.updateMovieList();
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      const parentsOfTarget = $('.item-list');
      const target = parentsOfTarget.children[parentsOfTarget.children.length - 21];

      observer.observe(target);
    } catch (error) {
      $('h2').innerText = error.message;

      this.hideSkeletonItem();
    }
  }

  async getMoviesFromApi(searchWord) {
    const apiFetchingData = await (await request(searchWord, this.#pageIndex)).json();

    const fetchedMovies = apiFetchingData.results;

    if (apiFetchingData.total_pages >= this.#pageIndex) {
      this.#pageIndex += 1;
    }

    const movies = parsedFechedMovies(fetchedMovies);

    this.#moviesData = {
      isInPageRange: apiFetchingData.total_pages >= this.#pageIndex,
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
    if (this.#moviesData.movies.length === 0) {
      this.showNoResult();
      return;
    }

    $('#first-skeleton').insertAdjacentHTML('beforebegin', this.makeMovieListTemplate(this.#moviesData.movies));
  }

  showNoResult() {
    const noResultMessage = document.createElement('span');
    noResultMessage.innerText = '검색 결과가 없습니다';
    noResultMessage.classList.add('no-result');

    $('.item-list').appendChild(noResultMessage);
  }

  makeMovieListTemplate() {
    return this.#moviesData.movies.reduce((acc, curr) => {
      return (
        acc +
        `<movie-item id="${curr.id}" title="${curr.title}" imgUrl="${curr.imgUrl}" score="${curr.score}"  genre="${curr.genre}" description="${curr.description}"></movie-item>`
      );
    }, '');
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
