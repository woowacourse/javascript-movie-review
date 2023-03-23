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

  //   addEvent() {
  //     document.addEventListener('keyup', (e) => {
  //       if (e.key === 'Escape')
  //         (document.querySelector('.modal') as HTMLDivElement).style.display = 'none';
  //     });
  //   }
}

export default Modal;
