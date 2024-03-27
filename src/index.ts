import "./styles/reset.css";
import "./styles/common.css";
import "./styles/modal.css";

import { $ } from "./utils/dom";
import App from "./App";

const root = $<HTMLDivElement>("#app");
root && new App(root);
