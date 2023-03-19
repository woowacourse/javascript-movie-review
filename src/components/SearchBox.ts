const SearchBox = () => {
  const create = () => {
    return `
      <input type="text" placeholder="검색" class="search-input"/>
      <button class="search-button">검색</button>
    `;
  };

  const render = () => {
    const searchBox = document.createElement("div");
    searchBox.classList.add("search-box");
    searchBox.innerHTML = create();

    document.querySelector("header")?.appendChild(searchBox);
  };

  const handleEvent = () => {
    const searchInput = document.querySelector(".search-input");
    searchInput?.addEventListener("keyup", (e) => {
      e.preventDefault();
      onKeyup(e);
    });
  };

  const onKeyup = (e: any) => {
    const target = e.target;
    const event = new CustomEvent("searchButtonClicked", {
      detail: {
        query: target!.value,
      },
    });
    document.querySelector(".search-input")!.dispatchEvent(event);
    updateKeyword(target!.value);
  };

  const updateKeyword = (newWord: string) => {
    const keywordElement = document.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    keywordElement.value = newWord;
  };

  const getKeyword = () => {
    const keywordElement = document.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    return keywordElement.value;
  };

  render();
  handleEvent();

  return { updateKeyword, getKeyword };
};

export default SearchBox;
