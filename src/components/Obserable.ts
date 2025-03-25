import Component from './core/Component';

interface ObserableProps {
  callback: (entries: IntersectionObserverEntry[]) => void;
}

export default class Obserable extends Component<ObserableProps> {
  onRender() {
    this.element.style.height = '1px';
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;

      this.props.callback(entries);
    });
    intersectionObserver.observe(this.element);
  }
}
