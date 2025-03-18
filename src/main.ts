import Header from "./components/Header";

const $body = document.querySelector("body");

if ($body) {
  $body.appendChild(Header());
}

console.log(Header());
