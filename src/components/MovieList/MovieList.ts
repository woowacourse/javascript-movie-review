import Component from '../common/Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
import { createElement } from '../../utils/dom/createElement/createElement';
import { MovieListCardProps } from '../MovieListCard/MovieListCard.type';
//TODO: 현재는 Props 타입으로 되어있지만 도메인 타입으로 수정해야 할듯!

interface MovieListProps {
  movieItemDetails: MovieListCardProps[];
}

class MovieList extends Component<MovieListProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    this.props?.movieItemDetails.forEach((movieItemDetail) => {
      const $li = createElement({ tagName: 'li' });
      new MovieListCard($li, movieItemDetail);

      $movieItemList.appendChild($li);
    });

    return $movieItemList;
  }
}

export default MovieList;
