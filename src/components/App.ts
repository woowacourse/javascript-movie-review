import Button from "./common/Button";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Modal from "./layout/Modal";

export default function App() {
  const $wrap = document.createElement("div");
  $wrap.id = "wrap";

  const $container = document.createElement("div");
  $container.className = "container";

  const $showMore = Button({ className: "show-more", textContent: "더 보기" });

  const $main = Main.getInstance().getElement();
  const $header = Header.getInstance().getElement();
  const $modal = Modal.getInstance().getElement();
  const $footer = Footer.getInstance().getElement();

  $container.append($main, $showMore);
  $wrap.append($header, $container, $footer, $modal);

  return $wrap;
}
