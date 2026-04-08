export default class MainTitle {
  element: HTMLElement;

  constructor() {
    this.element = document.querySelector(".main-title") as HTMLElement;
  }

  render(title: string): void {
    this.element.textContent = title;
  }
}
