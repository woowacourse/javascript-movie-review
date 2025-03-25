import toggleVisibility from "../../utils/toggleVisibility";
import { $seeMoreButton } from "./Element";

const SeeMoreButton = {
  init() {
    $seeMoreButton.addEventListener("click", (e) => this.onButtonClick(e));
  },

  onButtonClick(event: MouseEvent) {
    console.log(event.target, "onButtonClick 기능 미구현");
  },

  show() {
    toggleVisibility($seeMoreButton, "show");
  },

  hidden() {
    toggleVisibility($seeMoreButton, "hidden");
  },
};

export default SeeMoreButton;
