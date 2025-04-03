import { MovieApiClient } from '@/apis';
import { moviesStore, serverStore } from '@/store';

interface GetMoviesProps {
  page: number;
  query: string;
}

export const getMovies = async ({ query, page }: GetMoviesProps) => {
  const moviesResponse = await serverStore.query({
    queryFn: () =>
      MovieApiClient.get({
        page,
        query,
      }),
    queryKey: [query, page],
  });

  const movies = moviesStore.getState();
  moviesStore.setState([...(movies ? movies : []), ...moviesResponse.results]);
};

interface GetAllMoviesProps {
  page: number;
}

export const getAllMovies = async ({ page }: GetAllMoviesProps) => {
  const moviesResponse = await serverStore.query({
    queryFn: () =>
      MovieApiClient.getAll({
        page,
      }),
    queryKey: [page],
  });

  const movies = moviesStore.getState();
  moviesStore.setState([...(movies ? movies : []), ...moviesResponse.results]);
};
