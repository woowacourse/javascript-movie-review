import StarToggle from './StarToggle';

const SCORE_PER_STAR_RATING = 2;

class StarRating {
  #starCount: number = 5;
  $target: HTMLDivElement = document.createElement('div');
  #stars: StarToggle[] = [];

  constructor(starCount: number) {
    if (starCount === undefined) return;
    this.#starCount = starCount;
    this.#stars = Array.from({ length: starCount }).map(() => new StarToggle());
    this.#attachClickHandler();
    this.$target.append(...this.#stars.map(el => el.$target));
  }

  #attachClickHandler() {
    const clickHandler = (e: Event) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      this.#drawTo(this.#findId(e.target));
    };

    this.#stars.forEach(el => el.$target.addEventListener('click', clickHandler));
  }

  #findId(star: HTMLImageElement) {
    return Array.from(this.$target.children).indexOf(star);
  }

  #drawTo(id: number) {
    const isOn = (i: number) => i <= id;
    this.#stars.forEach((star, i) => (isOn(i) ? star.on() : star.off()));
  }
}

export default StarRating;
