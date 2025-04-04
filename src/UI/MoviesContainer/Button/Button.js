import "./Button.css";

class Button {
  constructor($target, onClick) {
    this.$target = $target;
    this.onClick = onClick;
  }

  render() {
    const $button = document.createElement("button");
    $button.classList.add("more-button");
    $button.textContent = "더보기";
    $button.type = "button";

    $button.addEventListener("click", this.onClick);

    this.$target.appendChild($button);
  }
}
export default Button;
