import useGetMovieDetail from "../../apis/movies/useGetMovieDetail";
import { images } from "../../assets/images";
import { isModalOpen, setIsModalOpen, setMovieDetail } from "../../store/store";
import { useEvents } from "../../utils/Core";
interface MovieItemProps {
  id: number;
  title: string;
  rate: number;
  src: string;
}

const MovieItem = (props: MovieItemProps) => {
  const { id, title, rate, src } = props;

  const { fetchMovieDetail } = useGetMovieDetail();

  const [addEvent] = useEvents(`.thumbnail-list`);
  addEvent("click", `#_${id}`, async () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
    const detail = await fetchMovieDetail(id);
    setMovieDetail(detail);
  });

  return `
              <li id="_${id}">
                <div class="item">
                  <img
                    class="thumbnail"
                    src="${src}"
                    alt="${title}"
                    onerror="this.src='${images.fallback}'"
                  />
                  <div class="item-desc">
                    <p class="rate">
                      <img src="${images.starEmpty}" class="star" />
                      <span>${rate?.toFixed(1)}</span>
                    </p>
                    <strong>${title}</strong>
                  </div>
                </div>
              </li>
  `;
};

export default MovieItem;
