import Component from '../../common/Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
import { IMovie } from '../../../domain/Movie/Movie.type';
import { createElement } from '../../../utils/dom/createElement/createElement';
import './MovieList.css';

interface MovieListProps {
  movieItems: IMovie[];
  createMovieDetailModal: (key: number) => void;
}

class MovieList extends Component<MovieListProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    if (this.props) {
      const { movieItems, createMovieDetailModal } = this.props;

      movieItems.forEach((movieItem) => {
        const $li = createElement({ tagName: 'li' });
        new MovieListCard($li, { movieItem, createMovieDetailModal });
        $movieItemList.appendChild($li);
      });
    }

    return $movieItemList;
  }
}

export default MovieList;
