import { MainPage } from '../pages/main-page/MainPage';
import SearchPage from '../pages/search-page/SearchPage';
import ErrorPage from '../pages/error-page/ErrorPage';

function routes(): Record<string, () => HTMLElement> {
  return {
    '/': () => new MainPage().element,
    '/search': () => new SearchPage().element,
    '/error': () => new ErrorPage().element,
  };
}

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
  return routes()[currentPath]();
}

export async function redirectToPage(url: string) {
  history.pushState({}, '', url);
  await renderContent();
}

export async function renderContent() {
  const layoutContainer = document.querySelector('.content');
  if (layoutContainer) {
    const oldContent = layoutContainer.querySelector('.render-content');
    if (oldContent) {
      oldContent.remove();
    }

    const newContent = await renderInnerContentsByRoute();

    if (newContent) {
      newContent.classList.add('render-content');
      layoutContainer.appendChild(newContent);
    }
  }
}
