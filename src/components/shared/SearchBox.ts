class SearchBox {
  htmlTemplate: string = '';

  constructor(template: string) {
    this.htmlTemplate = template;
  }

  render(element: HTMLElement) {
    element.insertAdjacentHTML('beforeend', this.htmlTemplate);
  }
}

export default SearchBox;
