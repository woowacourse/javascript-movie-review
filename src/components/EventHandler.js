import ContentsContainer from "./ContentsContainer";

const EVENT_HANDLER = {
  SEARCH_MOVIE: async (movieService, inputValue) => {
    const $section = document.querySelector("section");

    if (inputValue.trim() === "") {
      alert("검색어를 입력해주세요.");
    } else {
      const searchResult = await movieService.getSearchResult(inputValue);
      if ($section) {
        $section.innerHTML = "";
      }
      ContentsContainer(searchResult.results, `"${inputValue}" 검색 결과`);
    }
  },
};

export default EVENT_HANDLER;
