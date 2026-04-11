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

export const initDetailClick = (onClick: (movieId: number) => void) => {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('.primary.detail');
    if (!target) return;
    const movieId = (target as HTMLElement).dataset.movieId;
    if (!movieId) return;
    onClick(Number(movieId));
  });
};

export const initLoadMore = (onLoadMore: () => void) => {
  window.addEventListener('scroll', () => {                                          
    if(window.scrollY + window.innerHeight === document.documentElement.scrollHeight)onLoadMore()                                                      
  }); 
};

export const initMovieClick = (onSelect: (id: number) => void) => {
  document.addEventListener('click', (e: MouseEvent) => {
    const li = (e.target as HTMLElement).closest<HTMLLIElement>('.thumbnail-list li');
    if (!li?.dataset.movieId) return;
    onSelect(Number(li.dataset.movieId));
  });
};

export const initRatingClick = (onRate: (rating: number) => void) => {
  document.querySelector('#rate-stars')?.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement;
    const index = target.dataset.index;
    if (!index) return;
    onRate(Number(index) * 2);
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
