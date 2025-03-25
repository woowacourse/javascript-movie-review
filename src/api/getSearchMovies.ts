import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';

const getSearchMovies = async (query: string, params: Record<string, string>) => {
  try {
    const searchMovies = await getAppClient(query, params);

    return searchMovies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getSearchMovies;
