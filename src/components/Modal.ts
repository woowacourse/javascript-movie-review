class Modal {
  constructor() {
    this.init();
  }

  template = `
    <dialog class="modal"></dialog>
`;

  init() {
    this.render();
    this.addEvent();
  }

  render() {
    document.querySelector('#app')?.insertAdjacentHTML('beforeend', this.template);
  }

  addEvent = () => {
    const modal = <HTMLDialogElement>document.querySelector('.modal');
    modal.addEventListener('click', (event) => {
      if ((event.target as Element).nodeName === 'DIALOG') {
        this.closeModal();
      }
    });
  };

  closeModal = () => {
    const modal = <HTMLDialogElement>document.querySelector('.modal');
    document.body.style.removeProperty('overflow');
    modal.close();
  };
}

export default Modal;
