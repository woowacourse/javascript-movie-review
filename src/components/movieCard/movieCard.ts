import filledStar from '../../images/star_filled.png';

interface Props {
  movie: any;
}

export function createMovieCard({ movie }: Props) {
  const card = render(movie);
  return card;
}

function render(movie: any) {
  const movieCard = document.createElement('li');
  const link = document.createElement('a');
  link.href = '#';

  const itemCard = document.createElement('div');
  itemCard.className = 'item-card';

  const thumbnail = document.createElement('img');
  thumbnail.className = 'item-thumbnail';
  thumbnail.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`;
  thumbnail.loading = 'lazy';
  thumbnail.alt = movie.title;

  const title = document.createElement('p');
  title.className = 'item-title';
  title.textContent = movie.title;

  const score = document.createElement('p');
  score.className = 'item-score';
  const scoreImage = document.createElement('img');
  scoreImage.src = filledStar;
  scoreImage.alt = '별점';
  score.textContent = movie.vote_average;
  score.appendChild(scoreImage);

  itemCard.append(thumbnail, title, score);
  link.appendChild(itemCard);
  movieCard.appendChild(link);

  return movieCard;
}
