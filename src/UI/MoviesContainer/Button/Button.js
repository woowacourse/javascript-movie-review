import "./Button.css";

class Button {
  render() {
    const $button = document.createElement("button");
    $button.classList.add("more-button");
    $button.textContent = "더보기";

    return $button;
  }
}
export default Button;
