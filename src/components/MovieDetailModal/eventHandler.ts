const movieDetailModalEventHandler = () => {
  const closeButton = document.querySelector('.close-btn');
  closeButton?.addEventListener('click', () => {
    const detailModal = document.querySelector('.movie-detail');
    detailModal?.remove();
  });
};

export default movieDetailModalEventHandler;
