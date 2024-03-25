import './style.css';

const createShowMoreButton = () => {
  const button = document.createElement('button');
  button.classList.add('btn', 'primary', 'full-width');
  button.id = 'show-more-btn';
  button.textContent = '더 보기';
  return button;
};

export default createShowMoreButton;
