export const POPULAR = 'popular';
export const SEARCH = 'search';

export type IPageStatus = 'popular' | 'search';

let moviePage: number = 1;

let pageStatus: IPageStatus = 'popular';

export function plusPage() {
  moviePage++;
}

export function resetPage() {
  moviePage = 1;
}

export function getPage() {
  return moviePage;
}

export function togglePageStatus() {
  pageStatus = pageStatus === POPULAR ? SEARCH : POPULAR;
}

export function getPageStatus() {
  return pageStatus;
}
