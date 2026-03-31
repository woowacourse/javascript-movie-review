import template from "../templates/index.html?raw";
import { renderMovies } from "./movieRenderer.ts";

document.querySelector("#app")!.innerHTML = template;
renderMovies();
