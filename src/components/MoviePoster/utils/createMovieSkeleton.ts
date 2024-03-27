import createElement from "../../../utils/createElement";

export const createMovieThumbnailSkeleton = () => {
  return createElement("div", {
    attrs: {
      class: "item-thumbnail skeleton",
    },
  });
};

export const createMoviePreviewSkeleton = () => {
  const li = createElement("li");
  const itemCard = createElement("div", { attrs: { class: "item-card" } });
  const itemThumbnail = createMovieThumbnailSkeleton();
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
