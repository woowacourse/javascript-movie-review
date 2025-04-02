type Props = {
  handleSearch: (input: string) => void;
};

const SearchBar = ({ handleSearch }: Props) => {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "검색어를 입력하세요");
  input.type = "text";
  searchBar.appendChild(input);

  const button = document.createElement("button");
  button.innerText = "🔎";
  button.type = "button";
  searchBar.appendChild(button);

  button.addEventListener("click", () => {
    handleSearch(input.value);
  });

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      handleSearch(input.value);
    }
  });

  return searchBar;
};

export default SearchBar;
