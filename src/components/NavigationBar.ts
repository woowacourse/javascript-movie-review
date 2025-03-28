type NavigationBarProps = {
  input: HTMLDivElement | null;
  onClick?: () => void;
};

const NavigationBar = ({ input, onClick }: NavigationBarProps) => {
  const navigationContainer = document.createElement("div");
  navigationContainer.classList.add("navigation-container");

  navigationContainer.innerHTML = `
        <h1 class="logo" id="app-logo">
          <img src="images/logo.png" alt="MovieList" />
        </h1>
      `;

  if (input) {
    navigationContainer.appendChild(input);
  }

  if (onClick) {
    const appLogo = navigationContainer.querySelector("#app-logo");
    appLogo?.addEventListener("click", onClick);
  }

  return navigationContainer;
};

export default NavigationBar;
