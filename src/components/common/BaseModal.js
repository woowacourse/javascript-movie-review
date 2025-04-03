class BaseModal {
  constructor(
    options = {
      closeOnEsc: true,
      closeOnBackdropClick: true,
    },
  ) {
    this.options = options;
    this.isOpen = false;
    this.eventListeners = {};
  }

  open() {
    const modal = this.render();
    document.body.classList.add('modal-open');
    document.body.appendChild(modal);
    this.isOpen = true;
    this.setupEventListeners();
  }

  close() {
    const modal = document.querySelector('.modal');
    if (modal) {
      document.body.classList.remove('modal-open');
      modal.remove();
      this.isOpen = false;
      this.removeEventListeners();
    }
  }

  render() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'active');
    modal.id = 'modal';

    modal.innerHTML = /*html*/ `
    <div class="modal-background" id="modalBackground">
      <div class="modal-container">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <!-- 여기에 직접 내용 주입-->
      </div>
    </div>
  `;

    return modal;
  }

  setContent(content) {
    const container = document.querySelector('.modal-container');

    if (!container) {
      throw new Error('Modal container not found');
    }

    const closeButton = container.querySelector('.close-modal');
    container.innerHTML = '';
    container.appendChild(closeButton);

    if (typeof content === 'string') {
      container.insertAdjacentHTML('beforeend', content);
    } else if (content instanceof HTMLElement) {
      container.appendChild(content);
    }
  }

  setupEventListeners() {
    const modal = document.querySelector('.modal');
    const closeButton = modal.querySelector('.close-modal');

    closeButton.addEventListener('click', () => {
      this.close();
    });

    //esc 키 옵션 켜져있으면!
    if (this.options.closeOnEsc) {
      this.escKeyHandler = e => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escKeyHandler);
    }

    if (this.options.closeOnBackdropClick) {
      this.backdropClickHandler = e => {
        if (e.target.classList.contains('modal-background')) {
          this.close();
        }
      };
      modal.addEventListener('click', this.backdropClickHandler);
    }
  }

  removeEventListeners() {
    if (this.escKeyHandler) {
      document.removeEventListener('keydown', this.escKeyHandler);
    }
    if (this.backdropClickHandler) {
      document.removeEventListener('click', this.backdropClickHandler);
    }
  }

  handleClose() {
    this.close;
  }
}

export default BaseModal;
