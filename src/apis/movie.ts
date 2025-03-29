import { MovieApiClient } from '@/apis';
import { errorMessage } from '@/modules/Message';
import { errorStore, moviesResponseStore, moviesStore, pageStore, searchStore, serverStore } from '@/store';
import { isError, isString } from '@/utils';

interface GetMoviesProps {
  page: number;
  query?: string;
}

export const getMovies = async ({ query, page }: GetMoviesProps) => {
  let moviesResponse;

  const prevMoviesResponse = moviesResponseStore.getState();
  if (prevMoviesResponse && prevMoviesResponse.total_pages < page) return;

  try {
    if (query)
      moviesResponse = await serverStore.query({
        queryFn: () =>
          MovieApiClient.get({
            page,
            query,
          }),
        queryKey: [query, page],
      });
    else
      moviesResponse = await serverStore.query({
        queryFn: () =>
          MovieApiClient.getAll({
            page,
          }),
        queryKey: [page],
      });

    pageStore.setState(page);
    if (!query) searchStore.reset();

    moviesResponseStore.setState(moviesResponse);

    const movies = moviesStore.getState();
    moviesStore.setState([...(movies ? movies : []), ...moviesResponse.results]);
  } catch (error) {
    if (isError(error)) errorStore.setState(error);
    else if (isString(error)) errorStore.setState(new Error(error));
    else errorStore.setState(new Error(errorMessage.get('default')));
  }
};
