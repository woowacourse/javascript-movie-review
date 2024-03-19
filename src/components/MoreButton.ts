import createElementWithAttribute from "../utils/createElementWithAttribute";

const MoreButton = (isShowMoreButton: boolean) => {
  if (!isShowMoreButton) return undefined;

  const $moreButton = createElementWithAttribute("button", {
    class: "btn primary full-width",
  });
  $moreButton.textContent = "더 보기";

  return $moreButton;
};
export default MoreButton;
