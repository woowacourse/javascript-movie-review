import { $ } from "../utils/selector";

export const backToTop = () => {
  $("#top-button").addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0) return;

        if (entry.isIntersecting) $("#top-button").classList.toggle("active");
      });
    },
    { threshold: 1.0 }
  );

  if ($(".item-list").childElementCount >= 36) {
    observer.observe($(".item-list > li:nth-child(36)"));
  }
};
