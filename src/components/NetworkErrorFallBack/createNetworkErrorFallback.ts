import "./style.css";

import ERROR_MEOW_BASE64 from "./ERROR_MEOW_BASE64";
import PrimaryButton from "../Button/createPrimaryButton";
import createElement from "../../utils/createElement";

const createNetworkFallback = (retryAction: () => void) => {
  const section = createElement("section", {
    attrs: { class: "network-error-fallback" },
  });

  const img = createElement("img", {
    attrs: {
      src: ERROR_MEOW_BASE64,
      alt: "ERROR_MEOW",
      class: "error-meow",
    },
  });

  const mainText = createElement("h2", {
    content: "오늘부터 인터넷은 내가 지배한다옹~",
  });
  const subText = createElement("h3", {
    content: "(🙀 고양이가 인터넷 선을 물어뜯지는 않았는지 확인해보세요 🙀)",
  });

  const retryButton = new PrimaryButton({
    content: "재시도",
    onClickFunc: retryAction,
  });
  retryButton.element.classList.remove("full-width");
  retryButton.element.classList.add("reconnect-network-btn");

  section.append(img, mainText, subText, retryButton.element);

  return section;
};

export default createNetworkFallback;
