import toggleVisibility from "../../utils/toggleVisibility";
import { $noThumbnail } from "./Element";

const NoThumbnail = {
  show() {
    toggleVisibility($noThumbnail, "show");
  },

  hidden() {
    toggleVisibility($noThumbnail, "hidden");
  },
};

export default NoThumbnail;
