import MovieContainer from '../components/MovieContainer';
import CardList from '../components/shared/CardList';
import Button from '../components/shared/Button';

export interface MainComponents {
  movieContainer: MovieContainer | null;
  movieList: CardList | null;
  moreButton: Button | null;
}
