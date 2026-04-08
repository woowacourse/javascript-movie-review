export const MoreButton = (onClick: () => void): HTMLElement => {
  const $button = document.createElement('button');
  $button.className = 'more-button';
  $button.textContent = '더 보기';
  $button.addEventListener('click', onClick);

  return $button;
};
