import "./EmptyView.css";

class EmptyView {
  constructor(text, $target) {
    this.text = text;
    this.$target = $target;
  }
  render() {
    const $div = document.createElement("div");
    $div.classList.add("info-text-wrap");
    const $p = document.createElement("p");
    const $img = document.createElement("img");

    $p.textContent = this.text;

    $div.appendChild($img);
    $div.appendChild($p);
    $img.setAttribute("src", "./images/noResult.png");

    this.$target.appendChild($div);
  }
}
export default EmptyView;
