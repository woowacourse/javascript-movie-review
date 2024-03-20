import './MovieList.css';

import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const getSearchQuery = ($title: HTMLElement) => {
  if ($title && $title.textContent) return $title.textContent.split('"')[1];
};

const MovieList = () => {
  const $section = document.createElement('section');
  const $title = document.createElement('h2');
  const $ul = document.createElement('ul');
  const $loadMoreBtn = LoadMoreButton().render();

  const render = () => {
    $section.classList.add('item-view');

    $ul.classList.add('item-list');

    $loadMoreBtn.setAttribute('list-type', 'popular');

    $section.appendChild($title);
    $section.appendChild($ul);
    $section.appendChild($loadMoreBtn);

    return $section;
  };

  $loadMoreBtn.addEventListener('click', () => {
    const type = $loadMoreBtn.getAttribute('list-type');

    if (type === 'search') {
      $loadMoreBtn.dispatchEvent(
        new CustomEvent('search', {
          bubbles: true,
          detail: {
            query: getSearchQuery($title),
            curType: type,
          },
        }),
      );
    }
    if (type === 'popular') {
      $loadMoreBtn.dispatchEvent(
        new CustomEvent('popular', {
          bubbles: true,
          detail: {
            curType: type,
          },
        }),
      );
    }
  });

  document.dispatchEvent(
    new CustomEvent('popular', {
      bubbles: true,
      detail: {
        curType: 'popular',
      },
    }),
  );

  return {
    render,
  };
};
export default MovieList;
