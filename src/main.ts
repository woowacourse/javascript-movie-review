import Button from "./components/Button.ts";

document.addEventListener("DOMContentLoaded", () => {
  const button = Button({
    text: "버튼",
    onClick: () => {
      console.log("버튼 클릭");
    },
  });

  const footer = document.querySelector(".footer");
  footer?.appendChild(button);
});
