import Component from './core/Component';

interface ObserableProps {
  callback: (entries: IntersectionObserverEntry[]) => void;
  id: string;
}

export default class IntersectionObserble extends Component<ObserableProps> {
  onRender() {
    this.element.style.height = '1px';
    this.element.id = this.props.id;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;

        this.props.callback(entries);
      },
      { threshold: 0.1 },
    );
    intersectionObserver.observe(this.element);
  }
}
