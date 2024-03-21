import "../templates/reset.css";
import "../templates/common.css";

import { $ } from "./utils/dom";
import App from "./App";

const root = $<HTMLDivElement>("#app");
root && new App(root);
