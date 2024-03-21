import Component from '../../common/Component/Component';

import { createElement } from '../../../utils/dom/createElement/createElement';

import './ErrorToast.css';

interface ErrorToastProps {
  errorText: string;
}

class ErrorToast extends Component<ErrorToastProps> {
  protected render() {
    const errorToast = this.createComponent();

    this.$element.insertAdjacentElement('afterbegin', errorToast);

    setTimeout(() => {
      errorToast.classList.add('remove-toast');
      setTimeout(() => {
        this.$element.removeChild(errorToast);
      }, 600);
    }, 500);
  }

  protected createComponent() {
    return createElement({
      tagName: 'div',
      text: this.props?.errorText,
      attributeOptions: { class: 'toast' },
    });
  }
}

export default ErrorToast;
