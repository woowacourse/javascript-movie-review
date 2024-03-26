import "./styles/reset.css";
import "./styles/common.css";
import "./styles/modal.css";

import "../templates/star_empty.png";
import "../templates/star_filled.png";
import "../templates/logo.png";
import "../templates/search_button.png";

import { $ } from "./utils/dom";
import App from "./App";

const root = $<HTMLDivElement>("#app");
root && new App(root);
