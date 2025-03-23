import { paths } from "../../setting/settings.ts";
import { createElement } from "../../util/dom";

export default function Hero() {
  const backgroundHero = createElement("div", {
    id: "hero",
    className: "background-container",
  });

  backgroundHero.innerHTML = `

    <div class="overlay" aria-hidden="true" ></div>
       <div class="top-rated-container">
            <div class="top-rated-movie">
               <div class="rate">
                 <img src="${paths.star_empty}" class="star" />
                 <span class="rate-value">9.5</span>
               </div>
               <div class="title">인사이드 아웃2</div>
              <button class="primary detail">자세히 보기</button>
             </div>
  </div>
`;

  return backgroundHero;
}
