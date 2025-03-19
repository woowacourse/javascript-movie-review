import { images } from "../../assets/images";
import {
  searchInputValue,
  setIsSearchError,
  setSearchInputValue,
  setSearchResults,
  setTotalResults,
} from "../../store/store";
import { useEvents } from "../../utils/Core";
import Button from "../@common/Button";
import Input from "../@common/Input";

interface HeaderProps {
  rate: number;
  title: string;
}

const Header = (props: HeaderProps) => {
  const { rate, title } = props;
  const [addEvent] = useEvents(".background-container");

  addEvent("click", ".search-button-icon", (e) => {
    e.preventDefault();
    const inputElement = document.querySelector(
      ".search-input"
    ) as HTMLInputElement;

    const inputValue = inputElement?.value || "";

    if (!inputValue.trim()) return;

    setSearchInputValue(inputValue);
    handleSearch(inputValue);
  });

  const handleSearch = async (query: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1&query=${encodeURIComponent(
      query
    )}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const results = data.results || [];
      setTotalResults(data.total_results);
      setSearchResults(results);
    } catch (error) {
      setIsSearchError(true);
      console.error("Error fetching data:", error);
    }
  };

  return `
    <header class="header">
        <div class="background-container">
          <div class="overlay" aria-hidden="true">
            
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
