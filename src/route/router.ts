import { MainPage } from '../pages/main-page/MainPage';
import SearchPage from '../pages/search-page/SearchPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import { $ } from '../utils/selector';
import { PageRenderer } from './PageRenderer';

const renderer = new PageRenderer();

export interface PageInstance {
  element: HTMLElement;
  destroy?: () => void;
}

export const routes: Record<string, () => PageInstance> = {
  '/': () => new MainPage(),
  '/search': () => new SearchPage(),
  '/error': () => new ErrorPage(),
};

export async function renderInnerContentsByRoute() {
  const base = '/javascript-movie-review';
  let currentPath = window.location.pathname;
  if (currentPath.startsWith(base)) {
    currentPath = currentPath.replace(base, '') || '/';
  }

  if (currentPath.startsWith('/error')) {
    currentPath = '/error';
  }
  if (currentPath.startsWith('/search')) {
    currentPath = '/search';
  }

  return routes[currentPath]();
}

export async function redirectToPage(url: string) {
  history.pushState({}, '', url);
  await renderContent();
}

export function initRouter() {
  window.addEventListener('popstate', () => {
    renderContent();
  });
}

export async function renderContent() {
  const $layoutContainer = $({ selector: '.content' }) as HTMLElement;
  if (!$layoutContainer) throw new Error('content가 존재하지 않습니다.');

  const newPage = await renderInnerContentsByRoute();
  if (!newPage) throw new Error('Page가 존재하지 않습니다.');
  renderer.render({ $container: $layoutContainer, Page: newPage });
}
