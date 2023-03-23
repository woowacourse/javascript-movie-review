import { Movie } from '../domain/movie.type';
import { Subject } from '../states/Subject';
import { $context } from '../utils/selector';
import { VoteInput } from './VoteInput';

export class MovieDetailDialog {
  private readonly $root = document.createElement('dialog');

  private readonly $ = $context(this.$root);

  private readonly $vote = new VoteInput();

  constructor(private readonly movieSubject: Subject<Movie>) {
    this.$root.innerHTML = `
      <article class="detail-view">
        <form class="detail-header" method="dialog">
          <h1></h1>

          <button class="detail-close-button"></button>
        </form>
        <hr>
        <section class="detail-content">
          <img src="">

          <div>
            <h2 class="detail-genres"></h2>
            <p class="detail-overview"></p>

            <form class="detail-vote">
              <label>내 평점</label>
            </form>
          </div>
        </section>
      </article>
    `.trim();

    this.$('.detail-view').classList.add('fade');
    this.$('.detail-view').addEventListener('animationend', () => {
      this.$('.detail-view').classList.remove('fade');
    });

    this.$root.addEventListener('click', () => this.close());
    this.$('article').addEventListener('click', (event) => event.stopPropagation());

    this.$root.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') this.close();
    });

    this.$('.detail-vote').append(this.$vote.getRoot());

    this.movieSubject.subscribe((movie) => {
      this.$<HTMLHeadingElement>('.detail-header > h1').innerText = movie.title;
      this.$<HTMLImageElement>(
        'img',
      ).src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}`;
      this.$<HTMLParagraphElement>('.detail-overview').innerText = movie.overview;
    });

    window.addEventListener('popstate', () => this.dispose());

    this.$('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.close();
    });

    this.$root.addEventListener('close', (event) => {
      event.preventDefault();
      this.close();
    });
  }

  open() {
    document.body.append(this.$root);
    this.$root.showModal();
    window.history.pushState({}, '');
  }

  close() {
    window.history.back();
    this.dispose();
  }

  dispose() {
    this.$('.detail-view').addEventListener('animationend', (event) => {
      this.$root.remove();
    });
    this.$('.detail-view').classList.add('fade', 'dispose');
  }
}
