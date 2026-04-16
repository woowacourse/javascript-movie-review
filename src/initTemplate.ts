import template from '../templates/index.html?raw';
import { createModalHTML } from './createHtml.ts';

export const initTemplate = () => {
  document.querySelector('#app')!.innerHTML = template;
  document.body.appendChild(createModalHTML());
};
