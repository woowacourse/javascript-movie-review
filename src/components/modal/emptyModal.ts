const modal = {
  create(className: string, content: HTMLElement) {
    const modal = document.createElement('div');
    modal.className = className;

    const backdrop = createBackdrop();
    backdrop.appendChild(content);
    modal.append(backdrop);
    document.body.appendChild(modal);
    return modal;
  },

  createContainer() {
    const container = document.createElement('div');
    container.className = 'modal-container';
    container.tabIndex = -1;

    container.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.remove('modal--open');
      }
    });
    setTimeout(() => container.focus(), 0);
    container.focus();

    return container;
  },

  remove(className: string) {
    document.body.classList.remove('stop-scroll');
    document.querySelector(`.${className}`)?.remove();
  },
};

function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  return backdrop;
}

export default modal;
