import createElement from "../../../utils/createElement";

const createSkeletonPreview = () => {
  const li = createElement("li");
  const itemCard = createElement("div", { attrs: { class: "item-card" } });
  const itemThumbnail = createElement("div", {
    attrs: {
      class: "item-thumbnail skeleton",
    },
  });
  const itemTitle = createElement("div", {
    attrs: { class: "item-title skeleton" },
  });
  const itemScore = createElement("div", {
    attrs: { class: "item-score skeleton" },
  });

  itemCard.append(itemThumbnail, itemTitle, itemScore);

  li.append(itemCard);

  return li;
};

export default createSkeletonPreview;
