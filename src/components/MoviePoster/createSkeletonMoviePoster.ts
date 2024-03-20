import createElement from "../../utils/createElement";

const createSkeletonMoviePoster = () => {
  const li = createElement("li");
  const anchor = createElement("a");
  const itemCard = createElement("div", { class: "item-card" });
  const itemThumbnail = createElement("div", {
    class: "item-thumbnail skeleton",
  });
  const itemTitle = createElement("div", { class: "item-title skeleton" });
  const itemScore = createElement("div", { class: "item-score skeleton" });

  itemCard.append(itemThumbnail, itemTitle, itemScore);

  anchor.append(itemCard);
  li.append(anchor);

  return li;
};

export default createSkeletonMoviePoster;
