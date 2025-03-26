import Button from "./Common/Button";
import Modal from "./Layout/Modal";
import Header from "./Layout/Header";
import Tab from "./Layout/Tab";
import Main from "./Layout/Main";

export default function App() {
  const $wrap = document.createElement("div");
  $wrap.id = "wrap";

  const $container = document.createElement("div");
  $container.className = "container";

  const $showMore = Button({ className: "show-more", textContent: "더 보기" });
  const $tab = Tab();
  const $main = Main.getInstance().getElement();
  const $header = Header.getInstance().getElement();
  const $modal = Modal();

  $container.append($tab, $main, $showMore);
  $wrap.append($header, $container, $modal);

  return $wrap;
}
