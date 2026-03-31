const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const banner = document.getElementById("background-container");
const resultSection = document.getElementById("result-section");
const subTitle = document.getElementById("sub-title");

const handleSearch = (keyword: string) => {
  if (!banner || !subTitle || searchInput?.value.trim() === "") return;
  banner.hidden = true;
  resultSection?.classList.add("result-section");
  subTitle.innerText = `"${keyword}" 검색 결과`;
};

if (searchInput && searchButton) {
  searchButton.addEventListener("click", () => handleSearch(searchInput.value));

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(searchInput.value);
  });
}
