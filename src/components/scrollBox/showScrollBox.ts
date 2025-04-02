import { $ } from "../utils/selectors";
import scrollBox from "./scrollBox";

const showScrollBox = () => {
  const $target = $("body");
  if (!$target) {
    return;
  }

  $target.append(scrollBox());
};

export default showScrollBox;
