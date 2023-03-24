import { fetchMoviesByKeyword, fetchPopularMovies, waitFor } from '../apis/movieChart';
import { INITIAL_PAGE, PAGE } from '../constants';
import { useEffect, useState } from '../core';
import { MovieChart } from '../domain/MovieChart';

type DefaultFetchAction = (callback: (args: any) => Promise<void>) => (args?: any | undefined) => Promise<void>;

let page: number;
function useMovieChart(keyword: string) {
  const [movieChart, setMovieChart] = useState<MovieChart>();
  const [movieList, setMovieList] = useState<MovieChart['movieChartInfo']['results']>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchMore = (keyword: string) => {
    if (keyword) getMoviesByKeyword(keyword);
    else getPopularMovies();
  };

  useEffect(() => {
    page = INITIAL_PAGE;

    fetchMore(keyword);
  }, [keyword]);

  return { movieChart, movieList, isLoading, fetchMore };
}

export { useMovieChart };
