export const loader = () => {
  const app = document.querySelector('#app');

  const loader = document.createElement('div');
  const loaderBackground = document.createElement('div');

  loader.classList.add('loader');
  loaderBackground.classList.add('loader-background');

  loaderBackground.appendChild(loader);

  app?.appendChild(loaderBackground);
};
