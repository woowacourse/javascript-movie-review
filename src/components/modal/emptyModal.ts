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

    return container;
  },

  remove(className: string) {
    document.querySelector(`.${className}`)?.remove();
  },
};

function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  return backdrop;
}

export default modal;
