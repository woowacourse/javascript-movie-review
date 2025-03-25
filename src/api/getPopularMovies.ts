import { errorUi } from '../view/errorUi';
import { getAppClient } from './appClient';

const getPopularMovies = async (query: string, params: Record<string, string>) => {
  try {
    const movies = await getAppClient(query, params);
    return movies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};

export default getPopularMovies;
