export default class CustomButton {
  constructor(buttonProps) {
    this.buttonProps = buttonProps;
  }

  render() {
    const button = document.createElement("button");
    button.textContent = this.buttonProps.content;
    button.className = this.buttonProps.className;
    return button;
  }
}
