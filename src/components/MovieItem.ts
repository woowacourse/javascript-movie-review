import { CONSTANT_URL } from './../constant/api';
import { MovieDataType } from '../api/apiType';
import { NO_IMAGE, STAR_FILLED } from '../resource';

const setClickEvent = (element: HTMLElement) => {
  element.addEventListener('click', (event) => {
    const currentTarget = event.currentTarget as HTMLElement;

    event.target?.dispatchEvent(
      new CustomEvent('open-movie-detail', {
        bubbles: true,
        detail: currentTarget.id,
      }),
    );
  });
};

const MovieItem = ({ movieTitle, posterPath, voteAverage, movieId }: MovieDataType) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  const itemCard = document.createElement('div');
  const thumbnail = document.createElement('img');
  const movieTitleTag = document.createElement('p');
  const itemScore = document.createElement('p');
  const scoreImg = document.createElement('img');

  li.classList.add('movie-item');
  li.id = movieId.toString();
  itemCard.classList.add('item-card');
  thumbnail.classList.add('item-thumbnail');
  movieTitleTag.classList.add('item-title');
  itemScore.classList.add('item-score');

  thumbnail.src = posterPath ? `${CONSTANT_URL.poster}${posterPath}` : NO_IMAGE;

  thumbnail.setAttribute('loading', 'lazy');
  thumbnail.setAttribute('alt', movieTitle);

  movieTitleTag.textContent = movieTitle;

  scoreImg.src = STAR_FILLED;
  scoreImg.alt = '별점';

  itemScore.appendChild(scoreImg);
  scoreImg.insertAdjacentText('afterend', voteAverage.toFixed(1));

  itemCard.appendChild(thumbnail);
  itemCard.appendChild(movieTitleTag);
  itemCard.appendChild(itemScore);

  link.appendChild(itemCard);
  li.appendChild(link);

  setClickEvent(li);

  return li;
};

export default MovieItem;
