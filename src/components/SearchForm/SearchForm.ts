import getSearchedMovieList from "../../apis/getSearchedMovieList";
import { replaceMovieListBox } from "../../main";
import { removeBanner } from "../Banner/Banner";
import { setKeyword, setMovieListType } from "../MovieListBox/MovieListBox";
import { replaceSkeletonList } from "../Skeleton/List/SkeletonList";

const handleSearchFormSubmit = async (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const searchValue = target["search-input"].value;

  try {
    removeBanner();
    replaceSkeletonList();

    const searchResult = await getSearchedMovieList(searchValue, 1);
    replaceMovieListBox({
      title: `"${searchValue}" 검색 결과`,
      movieResult: searchResult,
    });

    setMovieListType("search");
    setKeyword(searchValue);
  } catch (error) {
    if (error instanceof Error) {
      // removeBanner();
      // replaceMovieListBox({
      //   title: `"${searchValue}" 검색 결과`,
      //   movieResult: { page: 0, results: [], total_pages: 0, total_results: 0 },
      // });
      // setTimeout(() => {
      //   alert(error.message);
      // }, 300);
    }
  }
};

const $SearchForm = () => {
  const $searchForm = createElement("form", {
    className: "search-box",
  });
  const $searchInput = createElement("input", {
    className: "search-input",
    name: "search-input",
    type: "text",
    placeholder: "검색어를 입력하세요",
  });
  const $searchButton = createElement("button", {
    type: "submit",
  });
  const $searchIcon = createElement("img", {
    src: "/images/search.svg",
    alt: "search",
  });
  $searchButton.appendChild($searchIcon);

  $searchForm.append($searchInput, $searchButton);
  $searchForm.addEventListener("submit", handleSearchFormSubmit);
  return $searchForm;
};

export default $SearchForm;
