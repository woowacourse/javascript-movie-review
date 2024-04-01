import { MovieUserServiceType } from '../../domain/MovieUserServiceType';
import { ResponseMovieData } from './LocalStorageDBType';

// 유저가 설정한 데이터
class localStorageDB implements MovieUserServiceType {
  private DB = localStorage;
  private movieDataKey = 'movie-data';

  getMovieUserData(movieId: number) {
    const storedMovieDataList = this.getDataByMap<number, ResponseMovieData>(this.movieDataKey);
    const movieData = storedMovieDataList.get(movieId) || null;

    return movieData;
  }

  setMovieUserData({ movieId, movieData }: { movieId: number; movieData: ResponseMovieData }) {
    const storedMovieDataList = this.getDataByMap<number, ResponseMovieData>(this.movieDataKey);

    storedMovieDataList.set(movieId, movieData);

    this.DB.setItem(this.movieDataKey, JSON.stringify(Array.from(storedMovieDataList)));
  }

  private getDataByMap<T = string, U = ResponseMovieData>(DBkey: string): Map<T, U> {
    const storedData = this.DB.getItem(DBkey) || null;

    return storedData ? new Map(JSON.parse(storedData)) : new Map();
  }
}

export default new localStorageDB();
