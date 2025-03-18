type InputProps = {
  type: "text" | null;
  placeholder: string;
  onClick: () => void;
};

const Input = ({ type, placeholder, onClick }: InputProps) => {
  const searchWrapper = document.createElement("div");
  searchWrapper.classList.add("search-wrapper");

  searchWrapper.innerHTML = `
      <input type="${
        type ?? "text"
      }" class="search-input" placeholder="${placeholder}" />
      <img src="/images/Search.png" class="search-icon" alt="검색" />
    `;

  // TODO 이벤트 연결
  const searchIcon = searchWrapper.querySelector(".search-icon");
  if (searchIcon) {
    searchIcon.addEventListener("click", onClick);
  }

  return searchWrapper;
};

export default Input;
