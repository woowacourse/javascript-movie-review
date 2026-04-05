export const Logo = (): HTMLElement => {
  const tempalte = `<img src="/images/logo.png" alt="MovieList" />`;

  const $h1 = document.createElement('h1');
  $h1.className = 'logo';
  $h1.innerHTML = tempalte;

  return $h1;
};
