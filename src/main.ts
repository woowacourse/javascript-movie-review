import image from "../templates/images/star_filled.png";
import modal from "../templates/modal.html?raw";
import "../templates/styles/index.css";

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
    app.innerHTML = modal;
  }
});
