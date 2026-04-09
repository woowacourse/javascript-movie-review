const getKeyword = () =>
  document.querySelector<HTMLInputElement>('.search-input')?.value ?? '';

export const initSearchSubmit = (onSubmit: (keyword: string) => void) => {
  document.addEventListener('click', (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('.search-button')) {
      const keyword = getKeyword();
      if (keyword) onSubmit(keyword);
    }
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && (e.target as HTMLElement).closest('.search-input')) {
      const keyword = getKeyword();
      if (keyword) onSubmit(keyword);
    }
  });
};

export const initLoadMore = (onLoadMore: () => void) => {
  document.querySelector('#load-movie-button')?.addEventListener('click', onLoadMore);
};

export const initMovieClick = (onSelect: (id: number) => void) => {
  document.addEventListener('click', (e: MouseEvent) => {
    const li = (e.target as HTMLElement).closest<HTMLLIElement>('.thumbnail-list li');
    if (!li?.dataset.movieId) return;
    onSelect(Number(li.dataset.movieId));
  });
};

export const initModalClose = (onClose: () => void) => {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('#closeModal') || target.id === 'modalBackground') {
      onClose();
    }
  });
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  });
};
