const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;
const searchButton = document.getElementById("search-button");
const banner = document.getElementById("background-container");

const handleSearch = () => {
  if (!banner || searchInput?.value.trim() === "") return;
  banner.style.visibility = "hidden";
  banner.style.height = "100px";
};

if (searchInput && searchButton) {
  searchButton.addEventListener("click", handleSearch);
}
