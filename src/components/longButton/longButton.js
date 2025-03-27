import createMovieLoader from "../../service/createMovieLoader";
import { defaultOptions, defaultQueryObject } from "../../setting/settings";
import { hideElement } from "../../view/InputView";
import Button from "../button/button";

export default function LongButton(text, onClick) {
  const $longButton = Button({
    className: ["primary", "width-100"],
    placeholder: text,
    id: "load-more",
    onClick,
  });

  return { $el: $longButton };
}
