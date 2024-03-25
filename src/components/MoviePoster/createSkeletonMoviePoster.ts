import createElement from "../../utils/createElement";

const createSkeletonMoviePoster = () => {
  const moviePosterLi = createElement("li");
  const itemCardDiv = createElement("div", { class: "item-card" });
  const itemThumbnail = createElement("div", {
    class: "item-thumbnail skeleton",
  });
  const itemTitle = createElement("div", { class: "item-title skeleton" });
  const itemScore = createElement("div", { class: "item-score skeleton" });

  itemCardDiv.append(itemThumbnail, itemTitle, itemScore);

  moviePosterLi.append(itemCardDiv);

  return moviePosterLi;
};

export default createSkeletonMoviePoster;
