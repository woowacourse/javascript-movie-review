import './style.css';
import movieContentManager from '../MovieContents/MovieContents';
import DOM from '../../utils/DOM';
import errorMessage from '../../error/errorMessage';

const { $ } = DOM;

interface Props {
  imageSource: string;
}

const headerManager = {
  render({ imageSource }: Props) {
    const header = document.createElement('header');
    const templates = /* html */ `
        <h1><img src=${imageSource} alt="MovieList 로고" onClick="window.location.reload()"/></h1>
        <form class="search-box">
          <input type="text" name="search" placeholder="검색" />
          <button type="submit" class="search-button">검색</button>
        </form>
      `;

    header.innerHTML = templates;
    this.handleSearchSubmit(header);
    return header;
  },

  handleSearchSubmit(header: HTMLElement) {
    header.querySelector('.search-box')?.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      $('main')?.remove();
      $('.search-error-msg')?.remove();

      const movie = this.getMovieName(event);
      if (movie.trim() === '') {
        this.displaySearchError();
      } else {
        this.renderMovie(movie);
      }
    });
  },

  getMovieName(event: Event) {
    const form = event.target as HTMLFormElement;
    const input = (form.elements.namedItem('search') as HTMLInputElement).value;

    return input;
  },

  displaySearchError() {
    const errorElement = errorMessage.noSearchedMovieError('검색된 영화가 없습니다 💢');
    $('.error-container')?.remove();
    $('#app')?.insertAdjacentHTML('beforeend', errorElement);
  },

  async renderMovie(movie: string) {
    const movieContents = await movieContentManager.renderMain(`"${movie}" 검색 결과`);
    movieContentManager.renderMovieData({ type: 'search', input: movie });

    $('#app')?.appendChild(movieContents);
  },
};

export default headerManager;
