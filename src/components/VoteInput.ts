import { $context } from '../utils/selector';

export type VoteInputProps = {
  value?: 2 | 4 | 6 | 8 | 10;
};

export class VoteInput {
  private readonly $root = document.createElement('form');

  private readonly $ = $context(this.$root);

  constructor({ value }: VoteInputProps = {}) {
    this.$root.classList.add('vote');
    this.$root.innerHTML = `
      <label class="star"><input name="vote" type="radio" value="2" data-text="최악이에요"></label>
      <label class="star"><input name="vote" type="radio" value="4" data-text="별로에요"></label>
      <label class="star"><input name="vote" type="radio" value="6" data-text="보통이에요"></label>
      <label class="star"><input name="vote" type="radio" value="8" data-text="재미있어요"></label>
      <label class="star"><input name="vote" type="radio" value="10" data-text="명작이에요"></label>
    `.trim();

    if (value) this.$(`.star:has([value="${value}"])?`)?.classList.add('active');

    this.$root.addEventListener('click', (event) => {
      if (event.target instanceof HTMLInputElement) {
        this.$('.active?')?.classList.remove('active');
        event.target.closest('label')!.classList.add('active');
      }
    });
  }

  getRoot() {
    return this.$root;
  }
}
