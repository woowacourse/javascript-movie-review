class App {
  $main = document.createElement("main");

  constructor($target) {
    this.render($target);
  }

  render($target) {
    // $target === $app
    $target.insertAdjacentElement("beforeend", this.$main);
  }
}

export default App;
