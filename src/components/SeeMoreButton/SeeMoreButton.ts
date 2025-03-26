import { toggleDisplay } from "../../utils/Render";
import { $seeMoreButton } from "./Element";

const SeeMoreButton = {
  init() {
    $seeMoreButton.addEventListener("click", (e) => this.onButtonClick(e));
  },

  onButtonClick(event: MouseEvent) {
    console.log(event.target, "onButtonClick 기능 미구현");
  },

  show() {
    toggleDisplay($seeMoreButton, "show");
  },

  hidden() {
    toggleDisplay($seeMoreButton, "hidden");
  },
};

export default SeeMoreButton;
