import App from "./App.js";
import { syncSearchStateWithURL } from "./domains/movie/urlStateSync.js";

const $app = document.getElementById("app");
const app = new App($app);
app.initialize();

window.addEventListener("popstate", async () => {
  await syncSearchStateWithURL();
});
