import '../../assets/images/star_empty.png';
import '../../assets/images/star_filled.png';

const onSrc = './images/star_filled.png';
const offSrc = './images/star_empty.png';

class StarToggle {
  readonly $target: HTMLImageElement = document.createElement('img');
  clicked = false;
  constructor(clicked?: boolean) {
    if (clicked !== undefined) {
      this.clicked = clicked;
    }
    this.#apply();
  }

  on() {
    this.clicked = true;
    this.#apply();
  }
  off() {
    this.clicked = false;
    this.#apply();
  }

  toggle() {
    this.clicked = !this.clicked;
    this.#apply();
  }

  #apply() {
    if (this.clicked) {
      this.$target.src = onSrc;
      return;
    }
    this.$target.src = offSrc;
  }
}

export default StarToggle;
