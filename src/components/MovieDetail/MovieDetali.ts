class MovieDetail {
  private template: HTMLDivElement;

  constructor() {
    this.template = this.createElements();
  }

  get element() {
    return this.template;
  }

  createElements() {
    const container = document.createElement('div');
    return container;
  }
}

export default MovieDetail;
