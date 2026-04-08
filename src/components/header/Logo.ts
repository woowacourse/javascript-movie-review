export const Logo = (): HTMLElement => {
  const tempalte = `
    <a href="#/">
      <img src="./images/logo.png" alt="MovieList" />
    </a>
  `;

  const $h1 = document.createElement('h1');
  $h1.className = 'logo';
  $h1.innerHTML = tempalte;

  return $h1;
};
