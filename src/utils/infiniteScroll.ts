import movies from '../domain/Movies';

export default class InfiniteScroll {
  private static instance: InfiniteScroll;

  private target: any;
  private io: any;

  constructor() {
    if (InfiniteScroll.instance) return InfiniteScroll.instance;
    InfiniteScroll.instance = this;

    this.io = new IntersectionObserver(this.ioCallback.bind(this));
  }

  ioCallback(entries: any, io: IntersectionObserver) {
    entries.forEach(async (entry: any) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);

        if (movies.getIsSearched()) {
          await movies.searchMovies(movies.getQuery());
          this.subscribeItem(this.target, io);
        } else {
          await movies.popularMovies();
          this.subscribeItem(this.target, io);
        }

        console.log('iocall');
      }
    });
  }

  subscribeItem(target: HTMLElement, io: IntersectionObserver) {
    io.observe(target);
  }

  setItem(target: HTMLElement) {
    this.target = target;

    this.subscribeItem(this.target, this.io);
  }
}
