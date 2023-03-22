class Logo {
  template = '';

  constructor(template: string) {
    this.template = template;
  }

  render(element: HTMLElement) {
    element.insertAdjacentHTML('beforeend', this.template);
  }
}

export default Logo;
