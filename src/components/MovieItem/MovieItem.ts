import './MovieItem.css';

import SELECTORS from '../../constants/selectors';
import StarFilled from '../../statics/images/star_filled.png';
import MoviePoster from '../MoviePoster/MoviePoster';

const { MOVIE_ITEM } = SELECTORS;

const createTitle = (title: string) => {
  const $title = document.createElement('p');
  $title.classList.add(MOVIE_ITEM.title);
  $title.textContent = title;
  return $title;
};

const createScore = (vote_average: number) => {
  const $score = document.createElement('p');
  $score.classList.add(MOVIE_ITEM.score);

  const $scoreImg = document.createElement('img');
  $scoreImg.src = StarFilled;
  $scoreImg.alt = '별점';

  const $scoreTxt = document.createElement('span');
  $scoreTxt.textContent = vote_average.toFixed(2).toString();

  $score.appendChild($scoreTxt);
  $score.appendChild($scoreImg);

  return $score;
};

const createThumbnail = (title: string, poster_path: string) => {
  const $thumbnail = MoviePoster({
    title,
    poster_path,
    type: MOVIE_ITEM.thumbnail,
  }).render();

  return $thumbnail;
};

const createCard = ({
  id,
  title,
  poster_path,
  vote_average,
}: Pick<MovieItem, 'title' | 'poster_path' | 'vote_average' | 'id'>) => {
  const $card = document.createElement('div');
  $card.classList.add(MOVIE_ITEM.card);
  $card.setAttribute('data-id', id.toString());

  const $thumbnail = createThumbnail(title, poster_path);
  const $title = createTitle(title);
  const $score = createScore(vote_average);

  $card.appendChild($thumbnail);
  $card.appendChild($title);
  $card.appendChild($score);

  return $card;
};

const createMovieItem = (movie: MovieItem) => {
  const $li = document.createElement('li');
  const $anchor = document.createElement('a');
  $anchor.href = '#';
  const $card = createCard(movie);

  $anchor.appendChild($card);
  $li.appendChild($anchor);

  return $li;
};

function MovieItem(movie: MovieItem) {
  return {
    render: () => {
      const $movieItem = createMovieItem(movie);
      return $movieItem;
    },
  };
}
export default MovieItem;
