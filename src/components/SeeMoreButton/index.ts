import template from './index.html';

export class SeeMoreButton extends HTMLElement {
  $li: HTMLElement;
  constructor() {
    super();
    this.$li = document.querySelector('.ul')!;
  }

  connectedCallback() {
    this.innerHTML = template;
  }

  addMoreButtonHandler = (moreButtonHandler: CallableFunction) => {
    this.$li = document.querySelector('ul')!.querySelector('movie-item:last-of-type')!;
    const io = new IntersectionObserver(
      (entry) => {

        if (entry[0].isIntersecting) {
          io.unobserve(this.$li);
          moreButtonHandler();
          this.$li = document.querySelector('ul')!.querySelector('movie-item:last-of-type')!;

          io.observe(this.$li);
        }
      },
      {
        threshold: 1,
        rootMargin: '-50px 0px',
      },
    );

    io.observe(this.$li);
  };
}
