import Component from '../../common/Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
import { IMovie } from '../../../domain/Movie/Movie.type';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { MOVIE } from '../../../constants/Condition';
import './MovieList.css';

interface MovieListProps {
  movieItems: IMovie[];
  observer: IntersectionObserver;
  openMovieDetailModal: (key: number) => void;
}

class MovieList extends Component<MovieListProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  private setIntersectionObserver(index: number, $movieItem: HTMLElement) {
    if (!this.props) return;
    if (this.props.movieItems.length !== MOVIE.MAX_ITEM) return;

    if (index === this.props.movieItems.length - 1) {
      this.props.observer.observe($movieItem);
      $movieItem.classList.add('observe');
    }
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    this.props?.movieItems.forEach((movieItem, index) => {
      const $li = this.createMovieListCard(movieItem);

      $movieItemList.appendChild($li);
      this.setIntersectionObserver(index, $li);
    });

    return $movieItemList;
  }

  private createMovieListCard(movieItem: IMovie) {
    const $li = createElement({ tagName: 'li' });

    if (this.props) {
      new MovieListCard($li, { movieItem, openMovieDetailModal: this.props.openMovieDetailModal.bind(this) });
    }

    return $li;
  }
}

export default MovieList;
