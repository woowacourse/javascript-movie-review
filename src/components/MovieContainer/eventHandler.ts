import tmdbApi from '../../api';
import { API_ENDPOINT } from '../../constants/api/api';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import { TMDBDetailProps } from '../../types/tmdb';

const fetchMovieDetails = async (movieId: string): Promise<TMDBDetailProps | null> => {
  try {
    const response = await tmdbApi.sendRequest(API_ENDPOINT.DETAIL(Number(movieId)));
    const { id, title, poster_path, genres, vote_average, overview } = response;

    return { id, title, poster_path, genres, vote_average, overview };
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function movieContainerEventlistener() {
  const movieItemList = document.querySelector('.item-list');

  movieItemList?.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    const movieItem = target.closest('li[data-id]');

    if (movieItem) {
      const movieId = movieItem.getAttribute('data-id');
      if (movieId) {
        const movieDetails = await fetchMovieDetails(movieId);
        if (movieDetails) {
          const movieDetailModal = MovieDetailModal(movieDetails);
          document.body.appendChild(movieDetailModal);
        }
      }
    }
  });
}

export default movieContainerEventlistener;
