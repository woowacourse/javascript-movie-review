import { MovieInfo } from './../domain/Movie';
import { fetchMoviesByKeyword, fetchPopularMovies, waitFor } from '../apis/movieChart';
import { INITIAL_PAGE, PAGE } from '../constants/movieChart';
import { CallbackEvent, useEffect, useState } from '../core';
import { MovieChart } from '../domain/MovieChart';
import { getClosest } from '../utils/common/domHelper';
import { useMovieOverviewModal } from './useMovieOverviewModal';

type DefaultFetchAction = (callback: (args: any) => Promise<void>) => (args?: any | undefined) => Promise<void>;

let page: number;
function useMovieChart(keyword: string) {
  const [movieChart, setMovieChart] = useState<MovieChart | null>(null);
  const [movieList, setMovieList] = useState<MovieChart['movieChartInfo']['results']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { focusedMovie, closeModal, openModal } = useMovieOverviewModal(false);

  const defaultFetchAction: DefaultFetchAction =
    <T>(callback: (args: T) => Promise<void>) =>
    async (args?) => {
      setIsLoading(true);
      await callback(args);
      setIsLoading(false);
    };

  const updateMovieData = (movieChart: MovieChart) => {
    const {
      movieChartInfo: { results },
    } = movieChart;
    setMovieChart(movieChart);

    page === INITIAL_PAGE ? setMovieList(results) : setMovieList([...movieList, ...results]);
    page += PAGE;
  };

  const getPopularMovies = defaultFetchAction(async () => {
    const [data, error] = await waitFor(fetchPopularMovies(page));
    if (error) throw new Error(JSON.stringify(error));

    updateMovieData(data);
  });

  const getMoviesByKeyword = defaultFetchAction(async (keyword: string) => {
    const [data, error] = await waitFor(fetchMoviesByKeyword(keyword, page));
    if (error) throw new Error(JSON.stringify(error));

    updateMovieData(data);
  });

  const getMovieInfo = (id: MovieInfo['id']) => {
    const [movie] = movieList.filter((movie) => movie.getMovieId() === id);

    return movie ?? null;
  };

  const fetchMore = (keyword: string) => {
    if (keyword) getMoviesByKeyword(keyword);
    else getPopularMovies();
  };

  const onClickMovie = (e: CallbackEvent) => {
    e.preventDefault();
    const movieId = getClosest(e.target, '.item--movie')?.dataset.id;

    if (movieId) {
      const focusedMovie = getMovieInfo(Number(movieId));

      openModal(focusedMovie);
    }
  };
  useEffect(() => {
    page = INITIAL_PAGE;

    fetchMore(keyword);
  }, [keyword]);

  return {
    values: { movieChart, movieList, isLoading, focusedMovie },
    handlers: { closeModal, openModal, fetchMore, onClickMovie },
  };
}

export { useMovieChart };
