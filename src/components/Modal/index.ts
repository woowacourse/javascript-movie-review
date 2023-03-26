class Modal {
  #$target;
  constructor($target: Element) {
    this.#$target = $target;
    this.render();
  }

  render() {
    this.#$target.innerHTML = /*html*/ `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <button class="close-button">X</button>
    </div>`;
  }
}

export { Modal };
