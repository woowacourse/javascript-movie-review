import { $subtitle } from "./Element";

const Subtitle = {
  init() {
    this.set("지금 있기 있는 영화");
  },

  set(text: string) {
    $subtitle.textContent = text;
  },
};

export default Subtitle;
