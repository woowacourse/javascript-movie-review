import moveList from '../components/MovieList';

export default (error: string) => {
  moveList.hideSkeleton();
  moveList.showMessage(error);
};
