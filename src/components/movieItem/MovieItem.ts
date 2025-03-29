import { images } from "../../assets/images";

interface MovieItemProps {
  title: string;
  rate: number;
  src: string;
  id: string;
}

const MovieItem = (props: MovieItemProps) => {
  const { title, rate, src, id } = props;

  return `
              <li class="item-container" data-id="${id}">
                <div class="item">
                  <img
                    class="thumbnail"
                    src="${src}"
                    alt="${title}"
                  />
                  <div class="item-desc">
                    <p class="rate">
                      <img src="${images.starEmpty}" class="star" />
                      <span>${rate}</span>
                    </p>
                    <strong>${title}</strong>
                  </div>
                </div>
              </li>
  `;
};

export default MovieItem;
