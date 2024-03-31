import Component from '../../common/Component/Component';

import type { MovieInterface } from '../../../domain/Movie/Movie.type';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import { FilledStar } from '../../../assets';
import { DEFAULT_IMAGE_URL } from '../../../constants/movie';

interface MovieListCardProps extends MovieInterface {
  onClick?: () => void;
}

class MovieListCard extends Component<MovieListCardProps> {
  protected createComponent() {
    const $anchor = createElement({ tagName: 'a' });

    $anchor.innerHTML = /* html */ `
      <div id="item-card" class="item-card">
        <img
          class="item-thumbnail"
          src="${this.props?.image ? `${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.image}` : ''}"
          loading="lazy",
          alt="${`${this.props?.title}`}"
          onerror="
            this.style.border='1px solid #e2e2e2';
            this.src='${DEFAULT_IMAGE_URL}';
          "
        />
        <p class="item-title">${this.props?.title}</p>
        <p class="item-score">${this.props?.score.toFixed(1)} <img src=${`${FilledStar}`} alt="별점" /> </p>
      </div>
    `;

    return $anchor;
  }

  protected setEvent() {
    const target = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.itemCard, this.$element);

    on({
      target,
      eventName: 'click',
      eventHandler: this.handleClickCard.bind(this),
    });
  }

  private handleClickCard(event: Event) {
    event.stopPropagation();

    if (!this.props?.onClick || !this.props?.id) return;

    this.props.onClick();
  }
}

export default MovieListCard;
