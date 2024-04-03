import StarToggle from './StarToggle';

class StarRating {
  readonly #starCount: number = 5;
  readonly $target: HTMLDivElement = document.createElement('div');
  readonly #stars: StarToggle[] = [];
  clickedId: number = 0;

  constructor(starCount: number, onClick?: (e: MouseEvent) => void) {
    if (starCount === undefined) return;
    this.#starCount = starCount;
    this.#stars = Array.from({ length: starCount }).map(() => new StarToggle());

    this.#stars.forEach(el => el.$target.addEventListener('click', this.#starClickHandler.bind(this)));
    this.$target.append(...this.#stars.map(el => el.$target));

    onClick && this.$target.addEventListener('click', (e: MouseEvent) => {});
  }

  #starClickHandler(e: Event) {
    if (!(e.target instanceof HTMLImageElement)) return;
    this.clickedId = this.#findId(e.target);
    this.#render();
  }

  #findId(star: HTMLImageElement) {
    return Array.from(this.$target.children).indexOf(star);
  }

  #render() {
    const isOn = (i: number) => i <= this.clickedId;
    this.#stars.forEach((star, i) => (isOn(i) ? star.on() : star.off()));
  }
}

export default StarRating;
