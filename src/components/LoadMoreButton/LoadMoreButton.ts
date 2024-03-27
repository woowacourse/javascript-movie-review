import './LoadMoreButton.css';

const createLoadMoreBtn = () => {
  const $btn = document.createElement('button');
  $btn.classList.add('btn');
  $btn.classList.add('primary');
  $btn.classList.add('full-width');
  $btn.textContent = '더 보기';

  return $btn;
};

const LoadMoreButton = () => {
  const $btn = createLoadMoreBtn();

  return {
    render: () => $btn,
  };
};

export default LoadMoreButton;
