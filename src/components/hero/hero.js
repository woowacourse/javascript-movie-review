import { paths } from "../../setting/settings.ts";
import { createElement } from "../../util/dom";
import { hideElement, hideImgSkeleton } from "../../view/MovieView.ts";

export default function Hero() {
  const backgroundHero = createElement("div", {
    id: "hero",
    className: "background-container",
  });

  backgroundHero.innerHTML = `

    <div class="overlay">
    
    <div class="hero-skeleton" id="hero-skeleton"></div>
    <img id="hero-img" alt="Hero Image" class="hero-img"/>
     <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
          <div class="top-rated-movie hide" id="top-rated-container">
               <div class="rate">
                 <img src="${paths.star_empty}" class="star" />
                 <span class="rate-value" id="hero-rate"></span>
               </div>
               <div class="title" id="hero-title"></div>
              <button class="primary detail">자세히 보기</button>
            </div>
        </div>
    
    </div>
       
`;

  return backgroundHero;
}
