import filledStar from '../../images/star_filled.png';
import emptyPng from '../../images/empty_poster.png';
import { Movie } from '../../interface/Movie';

export function showSkeleton() {
  const movieCard = document.createElement('li');
  movieCard.className = 'skeleton';
  const link = document.createElement('a');
  link.href = '#';

  const itemCard = document.createElement('div');
  itemCard.className = 'item-card';

  const thumbnail = document.createElement('img');
  thumbnail.className = 'item-thumbnail skeleton';

  const title = document.createElement('p');
  title.className = 'item-title skeleton';

  const score = document.createElement('p');
  score.className = 'item-score skeleton';

  itemCard.append(thumbnail, title, score);
  link.appendChild(itemCard);
  movieCard.appendChild(link);

  return movieCard;
}

export function updateCard(li: any, movie: Movie) {
  li.classList.toggle('skeleton');
  const thumbnail = li.querySelector('.item-thumbnail.skeleton');
  thumbnail.classList.toggle('skeleton');
  thumbnail.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}.jpg`
    : emptyPng;
  thumbnail.loading = 'lazy';
  thumbnail.alt = movie.title;

  const title = li.querySelector('.item-title.skeleton');
  title.classList.toggle('skeleton');
  title.textContent = movie.title;

  const score = li.querySelector('.item-score.skeleton');
  score.classList.toggle('skeleton');

  const scoreImage = document.createElement('img');
  scoreImage.src = filledStar;
  scoreImage.alt = '별점';
  score.textContent = movie.vote_average;

  score.appendChild(scoreImage);
}
