import './style.css';
import { MovieScore, MovieType } from '../../types/movie';
import { STAR_FILLED } from '../../images';
import DOM from '../../utils/DOM';
import modalManager from '../Modal/Modal';
import httpRequest from '../../api/httpRequest';
import { URL } from '../../api/url';
import { dispatchCustomEvent } from '../../utils/customEvent';

const { $ } = DOM;

const movieItemManager = {
  render(movie: MovieType) {
    const movieItem = document.createElement('li');

    const templates = /* html */ `
      <a>
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}"
            loading="lazy"
            alt="${movie.title}"
          />
          <p class="item-title">${movie.title}</p>
          <p class="item-score">
          <span>${movie.vote_average.toFixed(1)}<img src=${STAR_FILLED} alt="별점" /></span></p>
        </div>
      </a>
      `;

    movieItem.innerHTML = templates;
    this.handleModal(movieItem, movie);
    return movieItem;
  },

  handleModal(movieItem: HTMLLIElement, movie: MovieType) {
    movieItem?.addEventListener('click', async () => {
      const { movieList } = await httpRequest.getSearchedMovies(1, movie.title);

      const genreIds = movieList[0].genre_ids;
      const genreNames = await Promise.all(
        genreIds.map((genreId: number) => this.genreIdConverter(genreId)),
      );

      movieList[0].genre_ids = genreNames.join(', ');
      $('main')?.appendChild(modalManager.render(movieList[0]));

      dispatchCustomEvent<MovieScore>('openModal', { movie: movieList[0] });
    });
  },

  async genreIdConverter(genreID: number) {
    const response = await fetch(URL.GENRE);
    const data = await response.json();
    const result = data.genres.find((genre: { id: number; name: string }) => genre.id === genreID);

    return result.name;
  },
};

export default movieItemManager;
