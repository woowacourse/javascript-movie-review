import './MovieItem.css';
import SELECTORS from '../../constants/selectors';
import defaultA from '../../statics/images/no-poster-found-1.png';
import defaultB from '../../statics/images/no-poster-found-2.png';
import StarFilled from '../../statics/images/star_filled.png';

const DEFAULT_THUMBNAILS = [defaultA, defaultB];

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
  $score.textContent = vote_average.toString();
  $score.appendChild($scoreImg);

  return $score;
};

const createThumbnail = (title: string, poster_path: string) => {
  const $thumbnail = document.createElement('img');
  $thumbnail.classList.add(MOVIE_ITEM.thumbnail);
  $thumbnail.loading = 'lazy';
  $thumbnail.alt = title;

  $thumbnail.onerror = () => {
    const randIdx = Math.floor(Math.random() * DEFAULT_THUMBNAILS.length);
    $thumbnail.src = DEFAULT_THUMBNAILS[randIdx];
  };
  $thumbnail.src = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`;

  return $thumbnail;
};

const createCard = ({
  title,
  poster_path,
  vote_average,
}: Pick<MovieItem, 'title' | 'poster_path' | 'vote_average'>) => {
  const $card = document.createElement('div');
  $card.classList.add(MOVIE_ITEM.card);

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
