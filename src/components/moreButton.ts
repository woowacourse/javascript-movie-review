export const moreButton = () => {
  //   const button = document.createElement("button");
  //   button.classList.add("primary");
  //   button.textContent = "더 보기";
  //   button?.addEventListener("click", () => {
  //     console.log("AKD");
  //   });

  document.querySelector(".container")?.addEventListener("click", () => {
    console.log("dddd");
  });

  return `
    <button class="btn primary full-width">더 보기</button>
    `;
};
