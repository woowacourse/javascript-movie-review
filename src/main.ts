import image from "../templates/images/star_filled.png";
import SearchBar from "./ui/components/SearchBar.js";

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
    SearchBar.createSearchBar();
  }
});
