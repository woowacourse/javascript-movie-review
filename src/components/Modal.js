class Modal {
  constructor($parent) {
    this.$parent = $parent;

    this.render();
    this.selectDom();
    this.bindEvent();
  }

  template() {
    return `
      <dialog id="js-modal-container" class="modal-container">
        <form class="modal-form" method="dialog">
          <div class="modal-header">
            <h3 id="js-modal-title"></h3>
            <button class="modal-close-button">X</button>
          </div>
          <div id="js-modal-content" class="modal-content"></div>
        </form>
      </dialog>
    `;
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }

  selectDom() {
    this.$container = this.$parent.querySelector('#js-modal-container');
    this.$title = this.$parent.querySelector('#js-modal-title');
    this.$content = this.$parent.querySelector('#js-modal-content');
  }

  renderModal({ title, content }) {
    this.$title.textContent = title;
    this.$content.innerHTML = content;
    this.$container.showModal();
  }

  bindEvent() {
    this.$container.addEventListener('click', (event) => {
      if (event.target === this.$container) this.$container.close();
    });
  }
}

export default Modal;
