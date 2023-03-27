import { $ } from "../../utils/selector";

export const backToTop = () => {
  $("#top-button").addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      $("#top-button").classList.remove("active");
    } else {
      $("#top-button").classList.add("active");
    }
  });

  observer.observe($("header"));
};
