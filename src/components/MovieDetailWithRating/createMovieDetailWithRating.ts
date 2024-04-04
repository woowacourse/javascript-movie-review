import createElement from "../../utils/createElement";

const createMovieDetailWithRatingSkeleton = () => {
  const element = createElement("section", {
    attrs: { class: "movie-detail-with-rating" },
  });
  const thumbnail = createElement("div", {
    attrs: { class: "movie-thumbnail skeleton" },
  });

  const notPosterContainer = createElement("section", {
    attrs: { class: "movie-detail-with-rating__not-poster-container" },
  });

  const description = createElement("section", {
    attrs: { class: "movie-description skeleton" },
  });

  const ratingContainer = createElement("section", {
    attrs: { class: "movie-detail-with-rating__rating-container skeleton" },
  });

  notPosterContainer.append(description, ratingContainer);
  element.append(thumbnail, notPosterContainer);

  return element;
};

export default createMovieDetailWithRatingSkeleton;
