import { MovieFetchInfo, FetchType } from '../types/fetchType';
import movieList from '../components/MovieList';

export default (movieFetchInfo: MovieFetchInfo) => {
  if (movieFetchInfo.type === FetchType.Popular) return;

  movieList.setListName(movieFetchInfo.type, movieFetchInfo.keyword);
  movieList.cleanMovieList();
  movieList.createSkeleton();
};
