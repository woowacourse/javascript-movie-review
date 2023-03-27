import './Button.css';

class Button extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    const text = this.getAttribute('text');
    const color = this.getAttribute('color');

    this.innerHTML = /*html*/ `
      <button class="btn ${color}">${text}</button>
    `;
  }
}

export default Button;
