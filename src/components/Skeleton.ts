class Skeleton {
  private element = document.createElement('li');

  constructor() {
    this.element.classList.add('skeleton');
    this.element.innerHTML = `
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    `.trim();
  }

  render() {
    return this.element;
  }

  unwrap(content: HTMLElement) {
    this.element.after(content);
    this.element.remove();
  }

  remove() {
    this.element.remove();
  }
}

export default Skeleton;
