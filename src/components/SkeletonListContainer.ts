import { createElementWithAttribute } from "../utils";

const SkeletonImg = ($card: HTMLElement) => {
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "movie-thumbnail skeleton",
    }),
  );
};

const SkeletonTitle = ($card: HTMLElement) => {
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "movie-title skeleton",
    }),
  );
};

const SkeletonScore = ($card: HTMLElement) => {
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "movie-score skeleton",
    }),
  );
};

const SkeletonCard = () => {
  const $card = createElementWithAttribute("div", { class: "movie-card" });
  SkeletonImg($card);
  SkeletonTitle($card);
  SkeletonScore($card);

  return $card;
};

const Skeleton = () => {
  const $skeleton = document.createElement("li");

  const $card = SkeletonCard();

  $skeleton.appendChild($card);

  return $skeleton;
};

const SkeletonListTitle = () => {
  const $title = document.createElement("h2");
  $title.textContent = "로딩 중...";

  return $title;
};

const SkeletonList = () => {
  const $ul = createElementWithAttribute("ul", {
    class: "movie-list skeleton-list",
  });

  Array.from({ length: 12 }).forEach(() => {
    $ul.appendChild(Skeleton());
  });

  return $ul;
};

const SkeletonListContainer = () => {
  const $main = document.querySelector("main");
  const $section = createElementWithAttribute("section", {
    class: "skeleton-list-container",
  });

  $section.appendChild(SkeletonListTitle());
  $section.appendChild(SkeletonList());
  $main?.appendChild($section);
};

export default SkeletonListContainer;
