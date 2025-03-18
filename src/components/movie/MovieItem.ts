import { createElement } from "../../utils/createElement.ts";

type MovieItem={
  src:string,
  rate:number,
  title:string
}

const MovieItem = ({src,rate,title}:MovieItem)=>{
  return createElement(/*html*/ `
    <li>
      <div class="item">
        <img
          class="thumbnail"
          src=${src}
          alt=${title}
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span
              >${rate}</span
            >
          </p>
          <strong>${title}</strong>
        </div>
      </div>
    </li>
  `)
}

export default MovieItem;
