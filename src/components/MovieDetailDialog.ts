import { Movie } from '../domain/movie.type';
import { Subject } from '../states/Subject';
import { $context } from '../utils/selector';

export class MovieDetailDialog {
  private readonly $root = document.createElement('dialog');

  private readonly $ = $context(this.$root);

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
              <label>내 별점</label>
              <input type="range">
            </form>
          </div>
        </section>
      </article>
    `.trim();

    this.$root.addEventListener('close', () => {
      this.onClose();
    });

    this.$root.addEventListener('click', () => {
      this.close();
    });

    this.$root.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') this.close();
    });

    this.$('article').addEventListener('click', (event) => event.stopPropagation());

    this.movieSubject.subscribe((movie) => {
      this.$<HTMLHeadingElement>('.detail-header > h1').innerText = movie.title;
      this.$<HTMLImageElement>(
        'img',
      ).src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}`;
      this.$<HTMLParagraphElement>('.detail-overview').innerText = movie.overview;
    });

    window.addEventListener('popstate', () => {
      this.$root.close();
    });
  }

  open() {
    document.body.append(this.$root);
    this.$root.showModal();
    window.history.pushState({}, '');
  }

  close() {
    this.onClose();
    window.history.back();
  }

  private onClose() {
    this.$root.parentElement?.removeChild(this.$root);
  }
}
