import Component from '../../common/Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import MovieAPI from '../../../apis/movie/movie';
import { IMovie } from '../../../domain/Movie/Movie.type';
import { querySelector } from '../../../utils/dom/selector';
import { createElement } from '../../../utils/dom/createElement/createElement';
import './MovieList.css';

interface MovieListProps {
  movieItems: IMovie[];
  observer: IntersectionObserver;
}

class MovieList extends Component<MovieListProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  private setIntersectionObserver(index: number, $movieItem: HTMLElement) {
    if (!this.props) return;
    if (this.props.movieItems.length !== 20) return;

    if (index === this.props.movieItems.length - 1) {
      this.props?.observer.observe($movieItem);
      $movieItem.classList.add('observe');
    }
  }

  private openMovieDetailModal(key: number) {
    MovieAPI.fetchMovieDetail(key).then((data) => {
      new MovieDetailModal(this.$element, { movieDetail: data });

      const $modal = querySelector<HTMLDialogElement>('#movie-detail-modal');
      $modal.showModal();
    });
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    this.props?.movieItems.forEach((movieItem, index) => {
      const $li = createElement({ tagName: 'li' });
      new MovieListCard($li, { movieItem, openMovieDetailModal: this.openMovieDetailModal.bind(this) });
      $movieItemList.appendChild($li);

      this.setIntersectionObserver(index, $li);
    });

    return $movieItemList;
  }
}

export default MovieList;
