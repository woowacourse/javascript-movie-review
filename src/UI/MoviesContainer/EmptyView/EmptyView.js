import "./EmptyView.css";

class EmptyView {
  constructor(text) {
    this.text = text;
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

    return $div;
  }
}
export default EmptyView;
