import './style.css';
import MovieContentManager from '../MovieContents/MovieContents';
import DOM from '../../utils/DOM';

const { $ } = DOM;

interface Props {
  imageSource: string;
}

const HeaderManager = {
  render({ imageSource }: Props) {
    const header = document.createElement('header');
    const templates = /* html */ `
        <h1><img src=${imageSource} alt="MovieList 로고" /></h1>
        <form class="search-box">
          <input type="text" name="search" placeholder="검색" />
          <button type="submit" class="search-button">검색</button>
        </form>
      `;
    header.innerHTML = templates;
    this.submitMovieSearch(header);
    return header;
  },

  submitMovieSearch(header: HTMLElement) {
    header.querySelector('.search-box')?.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      $('main')?.remove();

      const movie = this.getMovieName(event);

      this.renderMovie(movie);
    });
  },

  getMovieName(event: Event) {
    const form = event.target as HTMLFormElement;
    const input = (form.elements.namedItem('search') as HTMLInputElement).value;

    return input;
  },

  async renderMovie(movie: string) {
    const movieContents = await MovieContentManager.renderMain(`"${movie}" 검색 결과`);
    MovieContentManager.renderMovieData({ type: 'search', input: movie });

    $('#app')?.appendChild(movieContents);
  },
};

export default HeaderManager;
