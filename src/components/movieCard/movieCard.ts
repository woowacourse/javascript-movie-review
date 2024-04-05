import filledStar from '../../images/star_filled.png';
import emptyPng from '../../images/empty_poster.png';
import { Movie } from '../../interface/Movie';
import MovieDetailModal from '../movieDetailModal/MovieDetailModal';
import imageUrl from '../../utils/imageUrl';

const MovieCard = (movie: Movie) => {
  const movieCard = render(movie);
  return movieCard;
};

const render = (movie: Movie) => {
  const list = document.createElement('li');
  list.className = 'movie-list';

  const anchor = document.createElement('a');

  const itemCard = document.createElement('div');
  itemCard.className = 'item-card';

  const thumbnail = document.createElement('img');
  thumbnail.className = 'item-thumbnail skeleton';
  thumbnail.src = movie.posterPath ? imageUrl('small', movie.posterPath) : emptyPng;
  thumbnail.loading = 'lazy';
  thumbnail.alt = movie.title;
  thumbnail.onload = () => {
    thumbnail.classList.remove('skeleton');
  };

  const title = document.createElement('p');
  title.className = 'item-title';
  title.textContent = movie.title;

  const score = document.createElement('p');
  score.className = 'item-score';
  score.textContent = movie.voteAverage;

  const scoreImage = document.createElement('img');
  scoreImage.src = filledStar;
  scoreImage.alt = '별점';

  score.appendChild(scoreImage);
  itemCard.append(thumbnail, title, score);
  anchor.appendChild(itemCard);
  list.appendChild(anchor);

  list.addEventListener('click', () => {
    const main = document.querySelector('main');
    if (!main) return;

    const movieDetailModal = new MovieDetailModal(movie.id);
    main.appendChild(movieDetailModal.element);
    movieDetailModal.open();
  });

  return list;
};

export default MovieCard;
