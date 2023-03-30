import { MovieFetchInfo } from '../types/fetchType';
import movieList from '../components/MovieList';

export default (movieFetchInfo: MovieFetchInfo) => {
  movieList.setListName(movieFetchInfo.type);
  movieList.cleanMovieList();
  movieList.createSkeleton();
};
