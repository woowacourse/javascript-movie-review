class MovieContainer {
  template: string;

  constructor(template: string) {
    this.template = template;
  }

  render(element: HTMLElement) {
    element.insertAdjacentHTML('beforeend', this.template);
  }

  renderChild(parentsElement: HTMLElement, template: string) {
    parentsElement.innerHTML = template;
  }
}

export default MovieContainer;
