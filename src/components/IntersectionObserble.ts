import Component from './core/Component';

interface ObserableProps {
  callback: IntersectionObserverCallback;
  id: string;
}

export default class IntersectionObserble extends Component<ObserableProps> {
  override onRender() {
    this.element.style.height = '1px';
    this.element.id = this.props.id;
    const intersectionObserver = new IntersectionObserver(this.props.callback, { threshold: 0.1 });
    intersectionObserver.observe(this.element);
  }
}
