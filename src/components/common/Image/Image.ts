import { createElement } from '../../../utils/dom/createElement/createElement';
import Component from '../Component/Component';

interface ImageProps {
  image: string;
  alt: string;
  class?: string;
}

class Image extends Component<ImageProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    return createElement({
      tagName: 'img',
      attributeOptions: { src: this.props?.image ?? '', alt: this.props?.alt ?? '', class: this.props?.class ?? '' },
    });
  }
}

export default Image;
