import Component from '../../common/Component/Component';

import { on } from '../../../utils/dom/eventListener/eventListener';

import { Logo } from '../../../assets';

class MovieLogo extends Component {
  protected render() {
    this.$element.insertAdjacentHTML('beforeend', this.createComponent());
  }

  protected createComponent() {
    return /* html */ ` 
      <img src=${Logo} alt="MovieList 로고" /> 
    `;
  }

  protected setEvent() {
    on({ target: this.$element, eventName: 'click', eventHandler: this.reloadPage });
  }

  private reloadPage() {
    window.location.reload();
  }
}

export default MovieLogo;
