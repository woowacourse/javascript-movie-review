import createElement from '../../utils/createElement';

const renderHandler = () => {
  const button = createElement('button', { className: 'btn primary full-width', textContent: '더보기' });

  return button;
};
export default renderHandler;
