import { style } from './errorModalStyle';
import template from './index.html';

class ErrorModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.assertShadowRoot();
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  assertShadowRoot(): asserts this is { shadowRoot: ShadowRoot } {
    if (!this.shadowRoot) throw new Error();
  }

  connectedCallback() {
    this.assertShadowRoot();
    this.shadowRoot.innerHTML = template;
  }

  render(message: string) {
    this.assertShadowRoot();
    this.shadowRoot.innerHTML = template.replace('{message}', message);
    this.shadowRoot.querySelector('.error-modal')?.classList.remove('hidden');
    setTimeout(() => {
      this.shadowRoot!.querySelector('.error-modal')?.classList.add('hidden');
    }, 3000);
  }
}

export default ErrorModal;
