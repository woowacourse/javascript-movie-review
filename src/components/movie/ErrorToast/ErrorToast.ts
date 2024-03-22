import Component from '../../common/Component/Component';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { TOAST } from '../../../constants/Condition';
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
      }, TOAST.POP_DOWN_TIME);
    }, TOAST.POP_UP_TIME);
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
