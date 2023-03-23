export default class App {
  private $target;

  constructor($target: HTMLElement) {
    this.$target = $target;

    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
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
