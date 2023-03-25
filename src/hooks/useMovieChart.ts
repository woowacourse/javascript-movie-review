import { MovieInfo, MyVote } from './../domain/Movie';
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
  const { isOpen, focusedMovie, closeModal, openModal } = useMovieOverviewModal(false);

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
    keyword ? getMoviesByKeyword(keyword) : getPopularMovies();
  };

  const onClickMovie = (e: CallbackEvent) => {
    e.preventDefault();
    const movieId = getClosest(e.target, '.item--movie')?.dataset.id;

    if (movieId) {
      const focusedMovie = getMovieInfo(Number(movieId));

      openModal(focusedMovie);
    }
  };

  const setMyVote = (vote: MyVote) => {
    const updatedMovieList = movieList.map((movie) => {
      if (movie.getMovieId() === vote.id) {
        movie.setMovieVote(vote);
      }

      return movie;
    });
    const currentFocusedMovie = getMovieInfo(Number(focusedMovie?.id));
    const updatedMovie = updatedMovieList.find((movie) => movie.getMovieId() === currentFocusedMovie?.getMovieId());

    if (updatedMovie) openModal(updatedMovie);
    setMovieList(updatedMovieList);
  };

  useEffect(() => {
    page = INITIAL_PAGE;

    fetchMore(keyword);
  }, [keyword]);

  useEffect(() => {}, [movieList]);

  return {
    values: { movieChart, movieList, isLoading, focusedMovie, isOpen },
    handlers: { closeModal, openModal, fetchMore, onClickMovie, setMyVote },
  };
}

export { useMovieChart };
