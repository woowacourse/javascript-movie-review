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
      <button type="button" data-value="2" class="star"></button>
      <button type="button" data-value="4" class="star"></button>
      <button type="button" data-value="6" class="star"></button>
      <button type="button" data-value="8" class="star"></button>
      <button type="button" data-value="10" class="star"></button>
    `.trim();

    if (value) this.$(`.star[data-value="${value}"]?`)?.classList.add('active');

    this.$root.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        this.$('.active?')?.classList.remove('active');
        event.target.classList.add('active');
      }
    });
  }

  getRoot() {
    return this.$root;
  }
}
