import isElement from '../../utils/isElement';
import isHTMLElement from '../../utils/isHTMLElement';
import Modal from '../Modal/Modal';
import { openModalHandler } from '../Modal/eventHandler';
import { MovieDetailProps } from '../../types/movie';
import MovieStorageService from '../../services/MovieStorageService';

/* eslint-disable max-lines-per-function */
const renderMovieItemDetailModal = ({
  title,
  genres,
  vote_average,
  poster_path,
  overview,
  star_rating,
}: MovieDetailProps) => {
  Modal({
    title,
    genres,
    vote_average,
    poster_path,
    overview,
    star_rating,
  });
  openModalHandler();
};

const renderDetailModal = (movieDetailData: MovieDetailProps) => {
  const { title, genres, vote_average, poster_path, overview, star_rating } = movieDetailData;
  renderMovieItemDetailModal({
    title,
    genres,
    vote_average,
    poster_path,
    overview,
    star_rating,
  });
};

const getMovieTitleEventPhaseHandler = async (event: Event, ul: Element) => {
  if (!(event.target instanceof Element)) return;
  const li = event.target.closest('li');
  if (!isHTMLElement(li)) return;

  if (li && ul.contains(li)) {
    const movieId = Number(li.dataset.id);
    const movieDetailData = await MovieStorageService.getDataFromMovieId(movieId);
    if (!movieDetailData) return;
    renderDetailModal(movieDetailData);
  }
};

const ulTagAddEventListener = (ul: Element) => {
  ul.addEventListener('click', (event) => getMovieTitleEventPhaseHandler(event, ul));
};

const renderMovieItemDetailModalHandler = () => {
  const ul = document.querySelector('.item-list');
  if (!isElement(ul)) return;

  ulTagAddEventListener(ul);
};

export default renderMovieItemDetailModalHandler;
