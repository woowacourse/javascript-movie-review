import Component from '../common/Component/Component';

import MovieListCard from '../MovieListCard/MovieListCard';

import type { MovieDetail } from '../../domain/Movie/Movie.type';

import { createElement } from '../../utils/dom/createElement/createElement';

interface MovieListProps {
  movieItemDetails: MovieDetail[];
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
