import LocalStorageDB from '../api/DB/LocalStorageDB';
import { ResponseMovieData } from '../api/DB/LocalStorageDBType';
import renderToast from '../component/toast/toast';
import { MovieUserServiceType } from './MovieUserServiceType';

type validAPIName = 'localStorageDB';

const API_FACTORY: Record<validAPIName, MovieUserServiceType> = {
  localStorageDB: LocalStorageDB,
};

class MovieUserService implements MovieUserServiceType {
  private readonly api;

  constructor(apiName: validAPIName) {
    this.api = API_FACTORY[apiName];
  }

  getMovieUserData(movieId: number) {
    try {
      return this.api.getMovieUserData(movieId);
    } catch (error) {
      if (error instanceof Error) renderToast(error.message);
      return null;
    }
  }

  setMovieUserData(props: { movieId: number; movieData: ResponseMovieData }) {
    try {
      this.api.setMovieUserData(props);
    } catch (error) {
      if (error instanceof Error) renderToast(error.message);
      return null;
    }
  }
}

export default MovieUserService;
