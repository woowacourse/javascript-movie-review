import { MainPage } from '../pages/main-page/MainPage';
import SearchPage from '../pages/search-page/SearchPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import { APP_CONFIG } from '../constants/systemConstants';

let previousPageInstance: { element: HTMLElement; destroy?: () => void } | null = null;

export function initRouter() {
  window.addEventListener('popstate', () => {
    renderContent();
  });
}

function routes(): Record<string, () => { element: HTMLElement; destroy?: () => void }> {
  return {
    '/': () => new MainPage(),
    '/search': () => new SearchPage(),
    '/error': () => new ErrorPage(),
  };
}

function destroyEvent() {
  if (previousPageInstance && previousPageInstance.destroy) previousPageInstance.destroy();
}

export async function renderInnerContentsByRoute() {
  let currentPath = window.location.pathname;

  if (currentPath.startsWith(APP_CONFIG.BASE_PATH)) {
    currentPath = currentPath.replace(APP_CONFIG.BASE_PATH, '') || '/';
  }
  if (currentPath.startsWith('/error')) currentPath = '/error';

  if (currentPath.startsWith('/search')) currentPath = '/search';

  return routes()[currentPath]();
}

export async function redirectToPage(url: string) {
  const redirectUrl = `${APP_CONFIG.BASE_PATH}${url}`;
  history.pushState({}, '', redirectUrl);
  await renderContent();
}

export async function renderContent() {
  const layoutContainer = document.querySelector('.content');
  if (!layoutContainer) return;

  destroyEvent();

  const newPageInstance = await renderInnerContentsByRoute();

  const oldContent = layoutContainer.querySelector('.render-content');
  if (oldContent) oldContent.remove();

  if (newPageInstance?.element) {
    newPageInstance.element.classList.add('render-content');
    layoutContainer.appendChild(newPageInstance.element);
    previousPageInstance = newPageInstance;
  }
}
