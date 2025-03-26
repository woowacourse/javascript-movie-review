type NavigationBarProps = {
  searchWrap: HTMLDivElement;
  routeToPopularPage: () => void;
};

const NavigationBar = ({
  searchWrap,
  routeToPopularPage,
}: NavigationBarProps) => {
  const navigationContainer = document.createElement("div");
  navigationContainer.classList.add("navigation-container");

  const logo = document.createElement("h1");
  logo.classList.add("logo");
  logo.innerHTML = `<img src="images/logo.png" alt="MovieList" />`;

  logo.addEventListener("click", routeToPopularPage);

  navigationContainer.append(logo, searchWrap);

  return navigationContainer;
};

export default NavigationBar;
