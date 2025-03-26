type InputProps = {
  type: "text" | null;
  placeholder: string;
  onSearch: (query: string) => void;
};

const Input = ({ type, placeholder, onSearch }: InputProps) => {
  const searchWrapper = document.createElement("div");
  searchWrapper.classList.add("search-wrapper");

  searchWrapper.innerHTML = `
      <input type="${
        type ?? "text"
      }" class="search-input" placeholder="${placeholder}" />
      <img src="images/Search.png" class="search-icon" alt="검색" />
    `;

  const searchInput = searchWrapper.querySelector(
    ".search-input"
  ) as HTMLInputElement;
  const searchIcon = searchWrapper.querySelector(".search-icon");

  const handleSearch = () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      onSearch(query);
    }
  };

  searchIcon?.addEventListener("click", handleSearch);

  searchInput?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  return searchWrapper;
};

export default Input;
