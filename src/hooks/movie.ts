import { MovieApiClient } from '@/apis';
import { errorStore, moviesResponseStore, moviesStore, pageStore } from '@/store';
import { isError, isString } from '@/utils';

export const getMovie = async (search: string, page: number) => {
  let moviesResponse;

  try {
    if (search)
      moviesResponse = await MovieApiClient.get({
        page,
        query: search,
      });
    else moviesResponse = await MovieApiClient.getAll({ page });

    pageStore.setState(page);
    moviesResponseStore.setState(moviesResponse);

    const movies = moviesStore.getState();
    moviesStore.setState([...(movies ? movies : []), ...moviesResponse.results]);
  } catch (error) {
    if (isError(error)) errorStore.setState(error);
    else if (isString(error)) errorStore.setState(new Error(error));
    else errorStore.setState(new Error('에러 발생'));
  }
};
