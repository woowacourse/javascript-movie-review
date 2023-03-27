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
