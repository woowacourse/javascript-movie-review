class Modal {
  $modal: HTMLDivElement | null;
  $modalContainer: HTMLDivElement | null;

  constructor() {
    this.$modal = document.querySelector('.modal');
    this.$modalContainer = document.querySelector('.modal-container');

    const $closeButton = document.createElement('button');
    $closeButton.className = 'modal-close-button';

    $closeButton.addEventListener('click', () => {
      this.close();
    });
    this.$modalContainer?.appendChild($closeButton);
  }

  open() {
    this.$modal?.classList.add('modal--open');
  }

  close() {
    this.$modal?.classList.remove('modal--open');
  }
}

const modal = new Modal();

export default modal;
