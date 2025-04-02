import { toggleDisplay } from "../../../utils/Render";
import { $modalLoadingSpinner } from "./Element";

const ModalLoadingSpinner = {
  show() {
    toggleDisplay($modalLoadingSpinner, true);
  },

  hidden() {
    toggleDisplay($modalLoadingSpinner, false);
  },
};

export default ModalLoadingSpinner;
