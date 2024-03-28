import "../templates/reset.css";
import "../templates/common.css";

import MainController from "./controllers/MainController";

const mainController = new MainController();

const body = document.querySelector("body");
body?.append(...mainController.elements);
