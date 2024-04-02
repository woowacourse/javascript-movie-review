import "./styles/reset.css";
import "./styles/common.css";
import "./styles/modal.css";

import App from "./App";

const $root = document.querySelector<HTMLDivElement>("#app");
$root && new App($root);
