import createMovieLoader from "../../service/createMovieLoader";
import { defaultOptions, defaultQueryObject } from "../../setting/settings";
import { hideElement } from "../../view/InputView";
import Button from "../button/button";

export default function LongButton(text, load) {
  const $longButton = Button({
    className: ["primary", "width-100"],
    placeholder: text,
    id: "load-more",
    onClick: load,
  });

  function setOnClick(onClick) {
    $longButton.onclick = onClick;
  }

  function hide() {
    hideElement($longButton);
  }

  return { $el: $longButton, setOnClick, hide };
}
