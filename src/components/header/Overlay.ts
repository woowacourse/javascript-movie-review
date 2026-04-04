export const Overlay = () => {
  const $overlay = document.createElement('div');
  $overlay.className = 'overlay';
  $overlay.ariaHidden = 'true';

  return $overlay;
};
