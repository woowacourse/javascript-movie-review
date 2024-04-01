import Component from '../../common/Component/Component';

import { createElement } from '../../../utils/dom/createElement/createElement';

import './MovieListCardSkeleton.css';

class MovieListCardSkeleton extends Component {
  static renderSkeletonList = ($container: HTMLElement, $target: HTMLElement, length: number) => {
    Array.from({ length }, () => new MovieListCardSkeleton($target));

    $container.append($target);
  };

  static hideSkeletonList = ($ul: HTMLElement) => {
    $ul.remove();
  };

  protected createComponent() {
    const li = createElement({ tagName: 'li' });

    li.innerHTML = /* html */ `
      <div id="item-card-skeleton" class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    `;

    return li;
  }
}

export default MovieListCardSkeleton;
