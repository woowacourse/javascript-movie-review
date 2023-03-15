import "../templates/logo.png";
import "../templates/star_filled.png";
import { App } from "./App";
import "../templates/reset.css";
import "../templates/common.css";

const appContainer = document.createElement("div");
App().then((result) => {
  appContainer.innerHTML = result;
  document.querySelector("h3")?.insertAdjacentElement("afterend", appContainer);
});
