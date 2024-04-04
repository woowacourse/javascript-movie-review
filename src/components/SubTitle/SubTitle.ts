class SubTitle {
  element = document.createElement("h2");

  constructor(string: string) {
    this.setTitle(string);
  }
  setTitle(string: string) {
    this.element.textContent = string;
  }
}

export default SubTitle;
