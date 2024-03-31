import './MovieDetail.css';

import SELECTORS from '../../constants/selectors';

import filledStar from '../../statics/images/star_filled.png';
import StarRating from './StarRating/StarRating';

const {
  container,
  header,
  genre,
  votingAverage,
  votingAverageIcon,
  votingAverageScore,
} = SELECTORS.MOVIE_DETAIL;

const createOverview = ({ overview }: Pick<MovieDetailProps, 'overview'>) => {
  const $overview = document.createElement('p');
  $overview.classList.add(SELECTORS.MOVIE_DETAIL.overview);
  $overview.textContent = overview;

  return $overview;
};

const createVotingAverage = ({
  vote_average,
}: Pick<MovieDetailProps, 'vote_average'>) => {
  const $votingAverage = document.createElement('div');
  $votingAverage.classList.add(votingAverage);

  const $icon = document.createElement('img');
  $icon.classList.add(votingAverageIcon);
  $icon.src = filledStar;

  const $score = document.createElement('p');
  $score.classList.add(votingAverageScore);
  $score.textContent = vote_average.toFixed(2);

  $votingAverage.appendChild($icon);
  $votingAverage.appendChild($score);

  return $votingAverage;
};

const createGenres = ({ genres }: Pick<MovieDetailProps, 'genres'>) => {
  const $genres = document.createElement('p');
  const genresStr = genres.map(({ name }) => name).join(', ');

  $genres.classList.add(genre);
  $genres.textContent = genresStr;

  return $genres;
};

const createHeader = () => {
  const $header = document.createElement('div');
  $header.classList.add(header);

  return $header;
};

const createContainer = () => {
  const $container = document.createElement('div');
  $container.classList.add(container);
  return $container;
};

const MovieDetail = ({
  id,
  genres,
  vote_average,
  overview,
}: MovieDetailProps) => {
  const $container = createContainer();

  const $div = document.createElement('div');
  const $header = createHeader();
  const $genres = createGenres({ genres });
  const $votingAverage = createVotingAverage({ vote_average });

  const $overview = createOverview({ overview });

  const $starRating = StarRating({ id }).render();

  const render = () => {
    $header.appendChild($genres);
    $header.appendChild($votingAverage);

    $div.appendChild($header);
    $div.appendChild($overview);

    $container.appendChild($div);
    $container.appendChild($starRating);

    return $container;
  };
  return {
    render,
  };
};

export default MovieDetail;
