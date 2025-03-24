const handleScrollToTopButtonClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const $ScrollToTopButton = () => {
  const $button = createElement("button", {
    type: "button",
    className: "scroll-to-top-button",
    textContent: "⬆",
  });

  $button.addEventListener("click", handleScrollToTopButtonClick);
  return $button;
};

export default $ScrollToTopButton;
