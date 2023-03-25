export default class MovieModal extends HTMLElement {
  constructor() {
    super();
    this.render('');
  }
  render(child: string) {
    this.innerHTML = `
    <div class="modal modal-dialog-centered">
      <div class="modal-content">
        ${child}
      </div>
    </div>
    `
  }
  open(child: string) {
    this.render(child);
    this.children[0].classList.add('modal--open')
  }
  close() {
    this.children[0].classList.remove('modal--open')
  }
}