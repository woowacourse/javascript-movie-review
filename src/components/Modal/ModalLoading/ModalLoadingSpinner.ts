import { toggleDisplay } from "../../../utils/Render";
import { $modalLoadingSpinner } from "./Element";

const ModalLoadingSpinner = {
  show() {
    toggleDisplay($modalLoadingSpinner, "show");
  },

  hidden() {
    toggleDisplay($modalLoadingSpinner, "hidden");
  },
};

export default ModalLoadingSpinner;
