export default class CustomButton {
  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  render() {
    const button = document.createElement('button');
    button.textContent = this.fieldName.content;
    button.className = this.fieldName.className;
    return button;
  }
}
