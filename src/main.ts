import App from "./components/App";
import { $ } from "./utils";

addEventListener("load", async () => {
  $("#app").appendChild(new App().render());
});
