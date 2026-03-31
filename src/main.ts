const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const banner = document.getElementById("background-container");
const resultSection = document.getElementById("result-section");

const handleSearch = () => {
  if (!banner || searchInput?.value.trim() === "") return;
  banner.hidden = true;
  resultSection?.classList.add("result-section");
};

if (searchInput && searchButton) {
  searchButton.addEventListener("click", handleSearch);
}
