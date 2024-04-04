import { MovieDetail } from '../../interface/Movie';
import emptyImg from '../../images/empty_poster.png';
import filledStar from '../../images/star_filled.png';
import { RecommendStar } from '../recommendStar/recommendStar';
import { getSavedRecommend } from '../../domain/LocalStorage';
import Modal from './EmptyModal';
import { fetchMovieDetail } from '../../apis/fetchData';

async function createMovieDetailModal(movieId: number) {
  const movieDetail = await fetchMovieDetail(movieId);
  const container = render(movieDetail);
  return container;
}

function render(movieDetail: MovieDetail) {
  const container = document.createElement('div');
  container.className = 'modal-container';

  const header = document.createElement('div');
  header.className = 'modal-header';

  const title = document.createElement('h3');
  title.className = 'modal-title';
  title.textContent = movieDetail.title;

  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close-button';
  closeButton.textContent = 'X';

  closeButton.addEventListener('click', () => Modal.remove('modal--open'));

  const body = document.createElement('main');
  body.className = 'modal-body';

  const poster = document.createElement('img');
  poster.className = 'modal-body-poster skeleton';
  poster.loading = 'lazy';
  poster.src = movieDetail.poster_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movieDetail.poster_path}.jpg`
    : emptyImg;
  poster.onload = () => poster.classList.toggle('skeleton');
  const movieDetailSection = createMovieDetailSection(movieDetail);

  header.append(title, closeButton);
  body.append(poster, movieDetailSection);
  container.append(header, body);

  return container;
}

function createMovieDetailSection(movieDetail: MovieDetail) {
  const section = document.createElement('section');
  section.className = 'modal-section';

  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'modal-body-header';

  const genre = document.createElement('h3');
  genre.className = 'modal-genre';
  genre.textContent = movieDetail.genres.join(', ');

  const voteBox = document.createElement('div');
  voteBox.className = 'voteBox';

  const voteAverage = document.createElement('span');
  voteAverage.textContent = movieDetail.vote_average.toString();

  const scoreImage = document.createElement('img');
  scoreImage.src = filledStar;
  scoreImage.alt = '별점';

  voteBox.append(scoreImage, voteAverage);

  const overview = document.createElement('article');
  overview.className = 'modal-overview';
  overview.textContent = movieDetail.overview;

  const SavedRecommend = getSavedRecommend(movieDetail);
  const recommendStarBox = new RecommendStar(SavedRecommend, 5);

  sectionHeader.append(genre, voteBox);
  section.append(sectionHeader, overview, recommendStarBox.createRecommendStar());

  return section;
}
export default createMovieDetailModal;
