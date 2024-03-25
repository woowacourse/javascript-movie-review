import './style.css';

class MoreSpace {
  private template: HTMLDivElement;

  constructor() {
    this.template = this.createElement();
  }

  get element() {
    return this.template;
  }

  private createElement() {
    const moreSpace = document.createElement('div');
    moreSpace.className = 'more-space';
    moreSpace.textContent = '더 보여줄거지롱';
    return moreSpace;
  }
}

export default MoreSpace;
