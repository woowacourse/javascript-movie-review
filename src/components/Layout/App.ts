import Button from "../Common/Button";
import Modal from "./Modal";
import Header from "./Header";
import Tab from "./Tab";
import Main from "./Main";

export default function App() {
  const $wrap = document.createElement("div");
  $wrap.id = "wrap";

  const $container = document.createElement("div");
  $container.className = "container";

  const $showMore = Button({ className: "show-more", textContent: "더 보기" });
  const $tab = Tab();
  const $main = Main.getInstance();

  const $header = Header();
  const $modal = Modal();

  $container.append($tab, $main.getElement(), $showMore);
  $wrap.append($header, $container, $modal);

  return $wrap;
}
