import template from '../templates/index.html?raw';

export const initTemplate = () => {
  document.querySelector('#app')!.innerHTML = template;
};
