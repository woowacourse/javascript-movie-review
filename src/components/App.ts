import Component from "./base/Component";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Modal from "./layout/Modal";

export default class App extends Component {
  private static instance: App;

  protected createElement(): HTMLElement {
    const $wrap = document.createElement("div");
    $wrap.id = "wrap";
    return $wrap;
  }

  static getInstance(): App {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }

  render() {
    const $container = document.createElement("div");
    $container.className = "container";

    const $main = Main.getInstance().getElement();
    const $header = Header.getInstance().getElement();
    const $modal = Modal.getInstance().getElement();
    const $footer = Footer.getInstance().getElement();

    $container.append($main);
    this.$element.append($header, $container, $footer, $modal);
  }
}
