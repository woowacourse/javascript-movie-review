import { RenderType } from '../types/props';

class MoviePage {
  popularPage: number = 1;

  searchPage: number = 1;

  getPage(renderType: RenderType): number {
    if (renderType === 'popular') return this.popularPage;
    if (renderType === 'search') return this.searchPage;
    return 0;
  }

  resetPage() {
    this.popularPage = 1;
    this.searchPage = 1;
  }

  updatePage(renderType: RenderType) {
    if (renderType === 'popular') this.popularPage += 1;
    if (renderType === 'search') this.searchPage += 1;
  }
}

export default MoviePage;
