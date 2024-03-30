import Button from '../Button/Button';
import { BUTTONS } from '../../constants/INFORMATION';
import DetailMovieData from '../../interfaces/DetailMovieData';

const MovieItemDetailTitleContainer = {
  create(onClick: () => void, detailMovieData: DetailMovieData) {
    const titleContainer = document.createElement('div');

    const movieItemTitle = this.createMovieItemTitle(detailMovieData);
    const movieItemCloseButton = Button.create(BUTTONS.close, onClick);

    titleContainer.classList.add('movie-item-detail_title-container');

    titleContainer.appendChild(movieItemTitle);
    titleContainer.appendChild(movieItemCloseButton);

    return titleContainer;
  },

  createMovieItemTitle(detailMovieData: DetailMovieData) {
    const movieItemTitle = document.createElement('h2');

    movieItemTitle.classList.add('movie-item-detail_title');
    movieItemTitle.textContent = detailMovieData.title;

    return movieItemTitle;
  },
};

export default MovieItemDetailTitleContainer;
