/* eslint-disable max-lines-per-function */
import createElementWithAttribute from "../utils/createElementWithAttribute";

const SkeletonCard = () => {
  const $card = createElementWithAttribute("div", { class: "item-card" });
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "item-thumbnail skeleton",
    }),
  );
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "item-title skeleton",
    }),
  );
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "item-score skeleton",
    }),
  );

  return $card;
};

const Skeleton = () => {
  const $skeleton = document.createElement("li");

  const $card = SkeletonCard();

  $skeleton.appendChild($card);

  return $skeleton;
};

const SkeletonList = () => {
  const $main = document.querySelector("main");
  const $section = createElementWithAttribute("section", {
    class: "skeleton-view",
  });
  const $title = document.createElement("h2");
  $title.textContent = "Loading...";
  const $ul = createElementWithAttribute("ul", {
    class: "item-list skeleton-list",
  });

  Array.from({ length: 8 }).forEach(() => {
    $ul.appendChild(Skeleton());
  });

  $section.appendChild($title);
  $section.appendChild($ul);
  $main?.appendChild($section);
};
export default SkeletonList;
