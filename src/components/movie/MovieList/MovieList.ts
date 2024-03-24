import Image from '../../common/Image/Image';
import Component from '../../common/Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';

import type { MovieDetail } from '../../../domain/Movie/Movie.type';

import { createElement } from '../../../utils/dom/createElement/createElement';

import { NoResultImage } from '../../../assets';

import './MovieList.css';

interface MovieListProps {
  movieItemDetails: MovieDetail[];
  removeMoreButton: () => void;
}

class MovieList extends Component<MovieListProps> {
  protected render() {
    if (!this.props?.movieItemDetails) return;

    if (this.props?.movieItemDetails.length === 0) {
      this.props?.removeMoreButton();

      new Image(this.$element, {
        image: NoResultImage,
        class: 'no-result-image',
        alt: '검색 결과 없음 이미지',
      });

      return;
    }

    if (this.props?.movieItemDetails.length < 20) this.props?.removeMoreButton();

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
