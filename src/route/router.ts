import { MainPage } from '../pages/main-page/MainPage';
import SearchPage from '../pages/search-page/SearchPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import { $ } from '../utils/selector';

const routes: Record<string, () => HTMLElement> = {
  '/': () => new MainPage().element,
  '/search': () => new SearchPage().element,
  '/error': () => new ErrorPage().element,
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
  const $layoutContainer = $({ selector: '.content' });
  if ($layoutContainer) {
    const $oldContent = $({ root: $layoutContainer, selector: '.render-content' });
    if ($oldContent) {
      $oldContent.remove();
    }

    try {
      const newContent = await renderInnerContentsByRoute();

      if (newContent) {
        newContent.classList.add('render-content');
        $layoutContainer.appendChild(newContent);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
