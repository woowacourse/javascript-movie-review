import useGetMovieDetail from "../../apis/movies/useGetMovieDetail";
import useGetSearchMovieList from "../../apis/movies/useGetSearchMovieList";
import { images } from "../../assets/images";
import useInputChange from "../../hooks/useInputChange";
import {
  isModalOpen,
  searchInputValue,
  setIsModalOpen,
  setMovieDetail,
  setSearchInputValue,
} from "../../store/store";
import { useEvents } from "../../utils/Core";
import { observeLastMovie } from "../../utils/InfiniteScroll";
import Button from "../@common/Button";
import Input from "../@common/Input";

interface HeaderProps {
  rate: number;
  title: string;
  src: string;
}

const Header = (props: HeaderProps) => {
  const { id, rate, title, src } = props;
  const { fetchSearchMovieList } = useGetSearchMovieList();
  const { fetchMovieDetail } = useGetMovieDetail();
  const { handleInputChange } = useInputChange(
    ".search-input",
    setSearchInputValue
  );

  const [addEvent] = useEvents(".background-container");

  addEvent("click", ".search-button-icon", async (e) => {
    e.preventDefault();
    handleInputChange();

    await fetchSearchMovieList(searchInputValue);

    observeLastMovie();
  });

  addEvent("click", `.detail`, async () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
    const detail = await fetchMovieDetail(id);
    setMovieDetail(detail);
    // observeLastMovie();
  });

  return `
    <header class="header">
        <div class="background-container">
          <div class="overlay" aria-hidden="true">
            <img src="https://image.tmdb.org/t/p/w500${src}" alt="background" />
          </div>
          <div class="top-rated-container">
           <div class="input-container">
            <form>
            ${Input({
              attribute: {
                class: "search-input",
                type: "text",
                placeholder: "검색어를 입력하세요",
                value: searchInputValue,
              },
            })}
              
              ${Button({
                attribute: {
                  class: "search-button-icon",
                },
                children: `<img src="${images.search}" alt="search" />`,
              })}
             </form>
            </div>
            <h1 class="logo">
              <img src="${images.logo}" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="${images.starEmpty}" class="star" />
                <span class="rate-value">${rate}</span>
              </div>
              <div class="title">${title}</div>
              ${Button({
                attribute: {
                  class: "primary detail",
                },
                children: "자세히 보기",
              })}
            </div>
          </div>
        </div>
      </header>
  `;
};

export default Header;
