import { set } from 'cypress/types/lodash';
import { fetchMoviesByKeyword, fetchPopularMovies, waitFor } from '../apis';
import { INITIAL_PAGE, PAGE } from '../constants';
import { useEffect, useState } from '../core';
import { GetMoviesByKeywordRes, GetPopularMoviesRes } from '../types/api';
type DefaultFetchAction = (callback: (args: any) => Promise<void>) => (args?: any | undefined) => Promise<void>;

let page: number;
function useMovieChart(keyword: string) {
  const [chartInfo, setChartInfo] = useState<GetPopularMoviesRes | GetMoviesByKeywordRes>();
  const [movieList, setMovieList] = useState<(typeof chartInfo)['results']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subtitle, setSubtitle] = useState<string>('');
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const defaultFetchAction: DefaultFetchAction =
    <T>(callback: (args: T) => Promise<void>) =>
    async (args?) => {
      setIsLoading(true);
      await callback(args);
      setIsLoading(false);
    };

  const updateMovieData = (data: GetPopularMoviesRes | GetMoviesByKeywordRes) => {
    setChartInfo(data);

    if (data.total_pages === page) setIsLastPage(true);
    page === INITIAL_PAGE ? setMovieList(data.results) : setMovieList([...movieList, ...data.results]);
    page += PAGE;
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
    page = INITIAL_PAGE;
    setIsLastPage(false);

    keyword ? setSubtitle(`"${keyword}"검색 결과`) : setSubtitle('지금 인기 있는 영화');
    fetchMore(keyword);
  }, [keyword]);

  return { chartInfo, movieList, isLoading, subtitle, isLastPage, fetchMore };
}

export { useMovieChart };
