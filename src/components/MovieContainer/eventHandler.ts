import tmdbApi from '../../api';
import { API_ENDPOINT } from '../../constants/api/api';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import { TMDBDetailProps } from '../../types/tmdb';

const fetchMovieDetails = async (movieId: string): Promise<TMDBDetailProps | null> => {
  try {
    const response = await tmdbApi.sendRequest(API_ENDPOINT.DETAIL(Number(movieId)));
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handleMovieItemClick = async (event: Event) => {
  const target = event.target as HTMLElement;
  const movieItem = target.closest('li[data-id]');
  if (!movieItem) return;

  const movieId = movieItem.getAttribute('data-id');
  if (!movieId) return;

  const movieDetails = await fetchMovieDetails(movieId);
  if (!movieDetails) return;

  const movieDetailModal = MovieDetailModal(movieDetails);
  document.body.appendChild(movieDetailModal);
};

function movieContainerEventlistener() {
  const movieItemList = document.querySelector('.item-list');
  movieItemList?.addEventListener('click', handleMovieItemClick);
}

export default movieContainerEventlistener;
