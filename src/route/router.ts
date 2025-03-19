import { MainPage } from '../pages/main-page/MainPage';
import SearchPage from '../pages/search-page/SearchPage';

const routes: Record<string, HTMLElement> = {
  '/': new MainPage().element,
  '/search': new SearchPage().element,
};

export function renderInnerContentsByRoute() {
  let currentPath = window.location.pathname;
  if (currentPath.startsWith('/search')) {
    currentPath = '/search';
  }
  return routes[currentPath];
}

export function redirectToPage(url: string) {
  // window.location.href = url;
  history.pushState({}, '', url);
  renderContent();
}

export function renderContent() {
  const layoutContainer = document.querySelector('.layout');
  if (layoutContainer) {
    console.log('없어짐');
    const oldContent = layoutContainer.querySelector('.content');
    if (oldContent) oldContent.remove();

    const newContent = renderInnerContentsByRoute();
    if (newContent) {
      console.log('새로 만듦', newContent);
      newContent.classList.add('content');
      layoutContainer.appendChild(newContent);
    }
  }
}
