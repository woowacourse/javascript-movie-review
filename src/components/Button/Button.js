function Button(text, className = "button", onClick) {
  const $button = document.createElement("button");

  $button.classList.add(className);
  $button.innerText = text;

  $button.addEventListener("click", onClick);

  return $button;
}

export default Button;
