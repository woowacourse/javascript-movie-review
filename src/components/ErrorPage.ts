<<<<<<< HEAD
import { store } from '../store';

export function ErrorPage() {
  return `
        <div class="error-item-list">${store.state.errorMessage}</div>
    `;
}

export function ErrorModal() {
  return `
        <div class="error-container">${store.state.errorMessage}</div>
  `;
}
=======
export function ErrorPage(errorMessage: string) {
  return `
        <div id="error-container">${errorMessage}</div>
    `;
}
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
