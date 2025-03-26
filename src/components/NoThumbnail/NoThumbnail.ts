import { toggleDisplay } from "../../utils/Render";
import { $noThumbnail } from "./Element";

const NoThumbnail = {
  show() {
    toggleDisplay($noThumbnail, "show");
  },

  hidden() {
    toggleDisplay($noThumbnail, "hidden");
  },
};

export default NoThumbnail;
