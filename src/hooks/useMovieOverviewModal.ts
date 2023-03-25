import { fetchMovieGenres, waitFor } from '../apis';
import { RemoteMovieGenre } from '../apis/movieChart.type';
import { MovieOverview } from '../components/MovieOverviewModal';
import { GENRES } from '../constants/movieChart';
import { useEffect, useState } from '../core';
import { Movie } from '../domain/Movie';
import { useModal } from './useModal';

function useMovieOverviewModal(initial: boolean) {
  const [isOpen, open, close] = useModal(initial);
  const [genres, setGenres] = useState<RemoteMovieGenre[]>([]);
  const [focusedMovie, setFocusMovie] = useState<MovieOverview | null>(null);

  const openModal = (movie: Movie) => {
    focusMovie(movie);
    open();
  };

  const closeModal = () => {
    setFocusMovie(null);
    close();
  };

  const parseGenres = (genre_ids: number[]) => {
    return genres.filter(({ id }) => genre_ids.includes(id)).map(({ name }) => GENRES[name]);
  };

  const focusMovie = (movie: Movie) => {
    const {
      movieInfo: { id, genre_ids, my_vote, overview, title, poster_path, vote_average },
    } = movie;

    setFocusMovie({ genres: parseGenres(genre_ids), id, my_vote, overview, title, poster_path, vote_average });
  };

  const fetchGenres = async () => {
    const [data, error] = await waitFor(fetchMovieGenres());
    if (error) throw new Error(JSON.stringify(error));

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return { isOpen, focusedMovie, openModal, closeModal };
}

export { useMovieOverviewModal };
