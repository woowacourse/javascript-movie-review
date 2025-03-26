import { MovieItemProps } from "../../../types/domain";
import { BACKDROP_IMG_PREFIX } from "../../constants/URL";
import { toggleDisplay } from "../../utils/Render";
import {
  $backgroundContainer,
  $headerTitle,
  $logo,
  $overlay,
  $rate,
  $topRatedMovie,
} from "./Element";

const Header = {
  init({ id, posterPath, rate, title }: MovieItemProps) {
    $logo.addEventListener("click", () => location.reload());
    this.setTitle({ id, posterPath, rate, title });
  },

  setTitle({ id, posterPath, rate, title }: MovieItemProps) {
    $overlay.style.backgroundImage = `url(${BACKDROP_IMG_PREFIX + posterPath})`;
    $rate.textContent = rate.toFixed(1);
    $headerTitle.textContent = title;
  },

  setSearchMode() {
    $backgroundContainer.style.height = "auto";
    toggleDisplay($overlay, "hidden");
    toggleDisplay($topRatedMovie, "hidden");
  },
};

export default Header;
