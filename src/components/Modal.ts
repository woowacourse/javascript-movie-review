class Modal {
  template = `
    <dialog class="modal"></dialog>
`;

  init() {
    this.render();
  }

  render() {
    document.querySelector('#app')?.insertAdjacentHTML('beforeend', this.template);
  }
}

export default Modal;
