import { toggleDisplay } from "../../utils/Render";
import { $noThumbnail } from "./Element";

const NoThumbnail = {
  show() {
    toggleDisplay($noThumbnail, true);
  },

  hidden() {
    toggleDisplay($noThumbnail, false);
  },
};

export default NoThumbnail;
