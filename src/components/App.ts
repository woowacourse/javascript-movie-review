import { publisher } from '../store/publisher';

import { Header } from './Header';
import { MainPage } from './MainPage';

export function App(state: publisher) {
  return `
      ${Header(state)}
      ${MainPage(state)}
    `;
}
