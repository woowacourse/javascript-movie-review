import Component from '../common/Component/Component';

import { FilledStar } from '../../assets';
import { createElement } from '../../utils/dom/createElement/createElement';
import { MovieDetail } from '../../domain/Movie/Movie.type';

class MovieListCard extends Component<MovieDetail> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $anchor = createElement({ tagName: 'a', attributeOptions: { href: '#' } });

    $anchor.innerHTML = /* html */ `
      <div class="item-card">
        <img
          class="item-thumbnail"
          src=${`${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.poster_path}`}
          loading="lazy",
          alt=${`${this.props?.title}`}
        />
        <p class="item-title">${this.props?.title}</p>
        <p class="item-score">${this.props?.vote_average.toFixed(1)} <img src=${`${FilledStar}`} alt="별점" /> </p>
      </div>
    `;

    return $anchor;
  }
}

export default MovieListCard;
