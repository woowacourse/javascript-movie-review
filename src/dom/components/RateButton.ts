const createRateButtonTemplate = (type: "filled" | "empty") => {
  return `
    <button>
      <img src="./images/star_${type}.png" alt="" class="star" />
    </button>
`;
};

export const renderRateButtons = (
  parent: HTMLElement,
  type: "filled" | "empty",
  count: number = 1,
) => {
  const itemsHTML = Array.from({ length: count })
    .map(() => createRateButtonTemplate(type))
    .join("");

  parent.insertAdjacentHTML("beforeend", itemsHTML);
};
