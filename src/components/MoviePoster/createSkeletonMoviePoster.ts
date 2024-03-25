import createElement from "../../utils/createElement";

const createSkeletonMoviePoster = () => {
  const moviePosterLi = createElement({ tagName: "li" });
  const itemCardDiv = createElement({
    tagName: "div",
    attrs: { class: "item-card" },
  });
  const itemThumbnail = createElement({
    tagName: "div",
    attrs: {
      class: "item-thumbnail skeleton",
    },
  });
  const itemTitle = createElement({
    tagName: "div",
    attrs: { class: "item-title skeleton" },
  });
  const itemScore = createElement({
    tagName: "div",
    attrs: { class: "item-score skeleton" },
  });

  itemCardDiv.append(itemThumbnail, itemTitle, itemScore);

  moviePosterLi.append(itemCardDiv);

  return moviePosterLi;
};

export default createSkeletonMoviePoster;
