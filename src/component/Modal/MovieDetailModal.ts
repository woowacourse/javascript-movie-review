import { $ } from '../../util/selector';
import { closeModal } from './Modal';
import starFilledIcon from '../../asset/star_filled.png';
import ScoreStar from '../ScoreStar';
import MovieUserService from '../../domain/MovieUserService';
import { MovieDetail } from '../../domain/MovieServiceType';

function createMovieDetailModal(movie: MovieDetail) {
  return ` <div class='movie-detail-modal' id=${movie.id}>
  <div class='modal-header'>
    <h3>${movie.title}</h3>
    <button class='modal-close-button'>X</button>
  </div>
  <div class='modal-content-container'>
    <img src='${movie.posterPath}'/>
    <div class='movie-description-container'>
      <div class='genre-score-container'>
        <div>${movie.genres.join(', ')}</div>
        <div class='score-container'>
          <img src='${starFilledIcon}'/>
          ${movie.voteAverage}
        </div>
      </div>
      <p>${movie.description}</p>
      <div class='score-star'></div>
    </div>
  </div>
</div>
`;
}

// TODO: any 삭제
function renderMovieDetailModal(movie: MovieDetail) {
  const container$ = $('.modal-container');

  container$.innerHTML = createMovieDetailModal(movie);

  const movieUserService = new MovieUserService('localStorageDB');

  new ScoreStar(movieUserService);

  const modalCloseButton = $('.modal-close-button', container$);
  modalCloseButton.addEventListener('click', () => closeModal('movieDetail'));
}

export default renderMovieDetailModal;
