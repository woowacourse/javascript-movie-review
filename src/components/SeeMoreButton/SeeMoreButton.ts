import { noop } from "@zoeykr/function-al";
import { toggleDisplay } from "../../utils/Render";
import { $seeMoreButton } from "./Element";

const SeeMoreButton = {
  init() {
    $seeMoreButton.addEventListener("click", (e) => this.onButtonClick(e));
  },

  onButtonClick(event: MouseEvent) {
    noop();
  },

  show() {
    toggleDisplay($seeMoreButton, true);
  },

  hidden() {
    toggleDisplay($seeMoreButton, false);
  },
};

export default SeeMoreButton;
