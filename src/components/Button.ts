import './Button.css';

class Button extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const text = this.getAttribute('text');
    const color = this.getAttribute('color');

    this.innerHTML = /*html*/ `
      <button class="btn ${color} full-width">${text}</button>
    `;
  }
}

export default Button;
