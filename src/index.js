import "../templates/reset.css";
import "../templates/common.css";

import App from "./components/App";

const $app = document.querySelector("#app");
new App($app);

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
