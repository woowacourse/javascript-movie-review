export const Logo = (): HTMLElement => {
  const $h1 = document.createElement('h1');
  $h1.className = 'logo';

  const $logo = document.createElement('img');
  $logo.src = './images/logo.png';
  $logo.alt = 'MovieList';

  $h1.append($logo);

  return $h1;
};
