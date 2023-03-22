export default class App {
  private $target;

  constructor($target: HTMLElement) {
    this.$target = $target;

    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();

    // this.$target.insertAdjacentHTML('beforeend', this.template());
    // new Title($('.movie-list-title'));
    // new MovieList($('.item-view')).skeletonRender();
    // new SeeMore($('.item-view')).render().setEvent();
  }

  template() {
    return `
      <movie-header></movie-header>
      <main>
        <section class="item-view">
        <movie-title></movie-title>
        <movie-list></movie-list>
        </section>
      </main>
    `;
  }
}
