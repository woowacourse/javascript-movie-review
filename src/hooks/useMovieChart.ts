import { fetchMoviesByKeyword, fetchPopularMovies, GetMoviesByKeywordRes, GetPopularMoviesRes, waitFor } from '../apis';
import { useEffect, useState } from '../core';

type DefaultFetchAction = (callback: (args: any) => Promise<void>) => (args?: any | undefined) => Promise<void>;

let page: number;
function useMovieChart(keyword: string) {
  const [chartInfo, setChartInfo] = useState<GetPopularMoviesRes | GetMoviesByKeywordRes>();
  const [movieList, setMovieList] = useState<(typeof chartInfo)['results']>([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultFetchAction: DefaultFetchAction =
    <T>(callback: (args: T) => Promise<void>) =>
    async (args?) => {
      setIsLoading(true);
      await callback(args);
      setIsLoading(false);

      setTimeout(() => {
        scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
      }, 500);
    };

  const updateMovieData = (data: GetPopularMoviesRes | GetMoviesByKeywordRes) => {
    setChartInfo(data);

    page === 1 ? setMovieList(data.results) : setMovieList([...movieList, ...data.results]);
    page += 1;
  };

  const getPopularMovies = defaultFetchAction(async () => {
    const [data, error] = await waitFor<GetPopularMoviesRes>(fetchPopularMovies(page));
    if (error) throw new Error(JSON.stringify(error));

    updateMovieData(data);
  });

  const getMoviesByKeyword = defaultFetchAction(async (keyword: string) => {
    const [data, error] = await waitFor<GetMoviesByKeywordRes>(fetchMoviesByKeyword(keyword, page));
    if (error) throw new Error(JSON.stringify(error));

    updateMovieData(data);
  });

  const fetchMore = (keyword: string) => {
    if (keyword) getMoviesByKeyword(keyword);
    else getPopularMovies();
  };

  useEffect(() => {
    page = 1;

    fetchMore(keyword);
  }, [keyword]);

  return { chartInfo, movieList, isLoading, fetchMore };
}

export { useMovieChart };
