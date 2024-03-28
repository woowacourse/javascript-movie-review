import MovieData from './MovieData';

interface ReplaceSkeletonProps {
  itemCard: HTMLElement;
  movieData: MovieData;
  setMovieItem: (movieData: MovieData) => void;
  onClick: () => void;
}

export default ReplaceSkeletonProps;
