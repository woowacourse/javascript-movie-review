import './MovieDetailModal.css';

import SELECTORS from '../../constants/selectors';
import {
  fetchMovieDetail,
  processMovieDetailResponse,
} from '../../services/TMDBService';

import MovieDetail from '../MovieDetail/MovieDetail';
import MoviePoster from '../MoviePoster/MoviePoster';

const { MODAL, MOVIE_DETAIL_MODAL } = SELECTORS;

const createMovieDetail = ({
  genres,
  vote_average,
  overview,
}: Pick<MovieDetail, 'genres' | 'vote_average' | 'overview'>) => {
  const $movieDetail = MovieDetail({
    genres,
    vote_average,
    overview,
  }).render();
  return $movieDetail;
};

const createPoster = ({
  title,
  poster_path,
}: Pick<MovieDetail, 'title' | 'poster_path'>) => {
  const $poster = MoviePoster({
    type: MOVIE_DETAIL_MODAL.poster,
    title,
    poster_path,
  }).render();
  return $poster;
};

const createBody = () => {
  const $body = document.createElement('div');
  $body.classList.add(MODAL.body);

  return $body;
};

const createHeader = () => {
  const $header = document.createElement('h2');
  $header.classList.add(MOVIE_DETAIL_MODAL.title);
  $header.classList.add(MODAL.header);

  return $header;
};

const createContainer = () => {
  const $container = document.createElement('div');
  $container.classList.add(MOVIE_DETAIL_MODAL.container);

  return $container;
};

const MovieDetailModal = (id: number) => {
  const $container = createContainer();
  const $header = createHeader();
  const $body = createBody();

  const onSuccess = (data: MovieDetailResponse) => {
    const { genres, overview, poster_path, title, vote_average } =
      processMovieDetailResponse(data);

    $header.textContent = title;

    const $poster = createPoster({ title, poster_path });
    const $movieDetail = createMovieDetail({
      genres,
      vote_average,
      overview,
    });
    $body.appendChild($poster);
    $body.appendChild($movieDetail);
  };

  const onError = (response: Response) => {};

  const onLoading = () => {};

  const render = () => {
    $container.appendChild($header);
    $container.appendChild($body);

    return $container;
  };

  fetchMovieDetail({ onSuccess, onError, onLoading, id });

  return {
    render,
  };
};

export default MovieDetailModal;
