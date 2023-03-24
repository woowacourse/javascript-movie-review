import { Movie } from '../domain/movie.type';
import { votes$ } from '../states';
import { $context } from '../utils/selector';

export type MovieMyVoteProps = {
  movieId: Movie['id'];
};

export class MovieMyVote {
  private readonly $root = document.createElement('form');

  private readonly $ = $context(this.$root);

  private readonly movieId;

  private value: number | null = null;

  private votes$ = votes$;

  constructor({ movieId }: MovieMyVoteProps) {
    this.movieId = movieId;

    this.$root.classList.add('vote');
    this.$root.innerHTML = `
      <label class="star" data-text="최악이에요"><input name="vote" type="radio" value="2"></label>
      <label class="star" data-text="별로에요"><input name="vote" type="radio" value="4"></label>
      <label class="star" data-text="보통이에요"><input name="vote" type="radio" value="6"></label>
      <label class="star" data-text="재미있어요"><input name="vote" type="radio" value="8"></label>
      <label class="star" data-text="명작이에요"><input name="vote" type="radio" value="10"></label>

      <div class="vote-value"></div>
      <div class="vote-text"></div>
    `.trim();

    this.$root.querySelectorAll('input').forEach(($input) =>
      $input.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
          this.setValue(Number(event.target.value));
        }
      }),
    );

    this.votes$.subscribe((votes) => {
      const value = votes[this.movieId];
      if (value === undefined) return;

      this.$('.active?')?.classList.remove('active');

      const target = this.$<HTMLLabelElement>(`.star:has([value="${value}"])?`);
      if (target !== null) {
        target.classList.add('active');

        this.$<HTMLDivElement>('.vote-value').innerText = target.querySelector('input')!.value;
        this.$<HTMLDivElement>('.vote-text').innerText = target.dataset.text!;
      }
    });
  }

  getRoot() {
    return this.$root;
  }

  getValue() {
    return this.value;
  }

  setValue(value: number) {
    this.value = value;
    this.$root.dispatchEvent(new Event('change'));
  }
}
