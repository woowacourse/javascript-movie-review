export type Movie = {
  title: string;
  vote_average: number;
  poster_path: string;
};

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
};

export type MoviesURLGenerator = (page: number) => string;

const template = (movie: Movie) => `<li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}"
                    loading="lazy"
                    alt="${movie.title}"
                  />
                  <p class="item-title">${movie.title}</p>
                  <p class="item-score"><img src="assets/star_filled.png" alt="별점" /> ${movie.vote_average}</p>
                </div>
              </a>
            </li>`;

const createSkeleton = `<li class="skeleton">
                          <a href="#">
                            <div class="item-card">
                              <div class="item-thumbnail skeleton"></div>
                              <div class="item-title skeleton"></div>
                              <div class="item-score skeleton"></div>
                            </div>
                          </a>
                        </li>`;

export class MoviesLoader {
  private isFinished = false;

  private page = 1;

  constructor(private readonly urlGenerator: MoviesURLGenerator) {
    document.querySelector('.item-list')!.innerHTML = '<hr>';
    this.init();
  }

  async init() {
    await this.nextPage();
    this.createSkeletons();
    this.load();
  }

  private createSkeletons() {
    if (this.isFinished) return;
    Array.from({ length: 20 }, () => {
      document.querySelector('.item-list')?.insertAdjacentHTML('beforeend', createSkeleton);
      return document.querySelector<HTMLLIElement>('.item-list > *:last-child')!;
    });
  }

  private async load() {
    if (this.isFinished) return;

    const page = this.page;
    const url = this.urlGenerator(page);
    this.page += 1;

    try {
      const response: TMDBResponse = await fetch(url).then((res) => res.json());

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const movies = response.results;

      const totalPages = response.total_pages;

      movies.forEach((movie: Movie) => {
        const $fragment = document.createElement('div');
        $fragment.innerHTML = template(movie);

        ($fragment.childNodes[0] as HTMLElement).setAttribute('page', String(page));
        const $skeleton = document.querySelector('li.skeleton')!;
        $skeleton.after($fragment.childNodes[0]);
        $skeleton.remove();
      });
      if (page < totalPages) return;

      this.isFinished = true;
    } catch (e) {
      const error = e as Error;
      this.createSkeletons();
      const $popup = document.createElement('div');
      $popup.classList.add('popup');
      $popup.innerText = String(error.message ?? error);

      document.querySelector('.popup-container')?.append($popup);

      setTimeout(() => {
        $popup.dataset.fadeOut = '';
        setTimeout(() => {
          $popup.remove();
        }, 1000);
      }, 5000);
    }
    document.querySelectorAll<HTMLLIElement>('li.skeleton').forEach(($skeleton: HTMLLIElement) => {
      $skeleton.remove();
    });
  }

  private reveal() {
    const $hr = document.querySelector('.item-list > hr')!;

    const $anchor: HTMLElement = Array(20)
      .fill(undefined)
      .reduce((acc) => acc?.nextSibling ?? acc, $hr);

    $anchor?.after($hr);
  }

  async nextPage() {
    this.createSkeletons();
    this.reveal();
    await this.load();
  }
}
