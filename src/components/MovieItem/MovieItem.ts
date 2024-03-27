import { POSTER_BASE_URL } from '../../api';
import { RULES } from '../../constants/rule';
import { MovieInfo } from '../../domain/Movies';
import { NO_IMAGE, STAR_FILLED } from '../../resource';

const MovieItem = ({ title, poster_path, vote_average }: MovieInfo) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  const itemCard = document.createElement('div');
  const thumbnail = document.createElement('img');
  const movieTitle = document.createElement('p');
  const itemScore = document.createElement('p');
  const scoreImg = document.createElement('img');

  li.classList.add('movie-item');
  itemCard.classList.add('item-card');
  thumbnail.classList.add('item-thumbnail', 'skeleton');
  movieTitle.classList.add('item-title');
  itemScore.classList.add('item-score');

  thumbnail.src = poster_path ? `${POSTER_BASE_URL}${poster_path}` : NO_IMAGE;

  thumbnail.setAttribute('loading', 'lazy');
  thumbnail.setAttribute('alt', title);

  movieTitle.textContent = title;

  thumbnail.addEventListener('load', () => {
    thumbnail.classList.remove('skeleton');
  });

  scoreImg.src = STAR_FILLED;
  scoreImg.alt = '별점';

  itemScore.appendChild(scoreImg);
  scoreImg.insertAdjacentText('afterend', vote_average.toFixed(RULES.averageDecimalPlaces));

  itemCard.appendChild(thumbnail);
  itemCard.appendChild(movieTitle);
  itemCard.appendChild(itemScore);

  link.appendChild(itemCard);
  li.appendChild(link);

  return li;
};

export default MovieItem;
