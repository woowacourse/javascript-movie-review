import Button from "./Common/Button";
import Header from "./Layout/Header";
import Modal from "./Layout/Modal";
import Footer from "./Layout/Footer";
import Main from "./Layout/Main";

export default function App() {
  const $wrap = document.createElement("div");
  $wrap.id = "wrap";

  const $container = document.createElement("div");
  $container.className = "container";

  const $showMore = Button({ className: "show-more", textContent: "더 보기" });
  const $main = Main.getInstance().getElement();
  const $header = Header.getInstance().getElement();
  const $modal = Modal();
  const $footer = Footer.getInstance().getElement();

  $container.append($main, $showMore);
  $wrap.append($header, $container, $footer, $modal);

  return $wrap;
}
