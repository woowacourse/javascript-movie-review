import { createElementWithAttribute } from "../utils";

const SkeletonImg = ($card: HTMLElement) => {
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "item-thumbnail skeleton",
    }),
  );
};

const SkeletonTitle = ($card: HTMLElement) => {
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "item-title skeleton",
    }),
  );
};

const SkeletonScore = ($card: HTMLElement) => {
  $card.appendChild(
    createElementWithAttribute("div", {
      class: "item-score skeleton",
    }),
  );
};

const SkeletonCard = () => {
  const $card = createElementWithAttribute("div", { class: "item-card" });
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
    class: "item-list skeleton-list",
  });

  Array.from({ length: 12 }).forEach(() => {
    $ul.appendChild(Skeleton());
  });

  return $ul;
};

const SkeletonView = () => {
  const $main = document.querySelector("main");
  const $section = createElementWithAttribute("section", {
    class: "skeleton-view",
  });

  $section.appendChild(SkeletonListTitle());
  $section.appendChild(SkeletonList());
  $main?.appendChild($section);
};
export default SkeletonView;
