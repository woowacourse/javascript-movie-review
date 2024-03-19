import './MovieItem.css';
import StarFilled from '../../statics/images/star_filled.png';
import Movie from '../../types/movie';

const createTitle = () => {
  const $title = document.createElement('p');
  $title.classList.add('item-title');
  $title.textContent = '앤트맨과 와스프: 퀀텀매니아';
  return $title;
};

const createScore = () => {
  const $score = document.createElement('p');
  $score.classList.add('item-score');

  const $scoreImg = document.createElement('img');
  $scoreImg.src = StarFilled;
  $scoreImg.alt = '별점';
  $score.textContent = '6.5';
  $score.appendChild($scoreImg);

  return $score;
};

const createThumbnail = () => {
  const $thumbnail = document.createElement('img');
  $thumbnail.classList.add('item-thumbnail');
  $thumbnail.src =
    'https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"';
  $thumbnail.loading = 'lazy';
  $thumbnail.alt = '앤트맨과 와스프: 퀀텀매니아';

  return $thumbnail;
};

const createCard = () => {
  const $card = document.createElement('div');
  $card.classList.add('item-card');

  const $thumbnail = createThumbnail();
  const $title = createTitle();
  const $score = createScore();

  $card.appendChild($thumbnail);
  $card.appendChild($title);
  $card.appendChild($score);

  return $card;
};

const createMovieItem = () => {
  const $li = document.createElement('li');
  const $anchor = document.createElement('a');
  $anchor.href = '#';
  const $card = createCard();

  $anchor.appendChild($card);
  $li.appendChild($anchor);

  return $li;
};

function MovieItem(movie: Movie) {
  console.log(movie);
  return {
    render: () => {
      const $movieItem = createMovieItem();
      return $movieItem;
    },
  };
}
export default MovieItem;
