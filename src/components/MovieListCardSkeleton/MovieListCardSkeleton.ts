import { createElement } from '../../utils/dom/createElement/createElement';
import Component from '../common/Component/Component';

class MovieListCardSkeleton extends Component {
  protected render() {
    this.$element.appendChild(this.createComponent());
  }

  protected createComponent() {
    const li = createElement({ tagName: 'li' });

    li.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    `;

    return li;
  }
}

export default MovieListCardSkeleton;
