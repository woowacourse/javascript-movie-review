import template from './index.html';

export class SeeMoreButton extends HTMLElement {
  $li: HTMLElement;
  constructor() {
    super();
    this.$li = document.querySelector('.btn')!;
  }

  connectedCallback() {
    this.innerHTML = template;
  }

  addMoreButtonHandler = (moreButtonHandler: CallableFunction) => {
    this.$li = document.querySelector('.btn')!;
    const io = new IntersectionObserver(
      (entry) => {
        const ioTarget = entry[0].target;

        if (entry[0].isIntersecting) {
          io.unobserve(this.$li);
          moreButtonHandler();
          this.$li = document.querySelector('.btn')!;

          io.observe(this.$li);
        }
      },
      {
        threshold: 0.7,
      },
    );

    io.observe(this.$li);
  };

  remove() {
    this.querySelector('.btn')?.classList.remove('btn');
  }

  attach() {
    this.querySelector('.infinite')?.classList.add('btn');
  }
}
