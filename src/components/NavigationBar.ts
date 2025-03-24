type NavigationBarProps = {
  input: HTMLDivElement | null;
};

const NavigationBar = ({ input }: NavigationBarProps) => {
  const navigationContainer = document.createElement("div");
  navigationContainer.classList.add("navigation-container");

  navigationContainer.innerHTML = `
        <h1 class="logo">
          <img src="images/logo.png" alt="MovieList" />
        </h1>
      `;

  if (input) {
    navigationContainer.appendChild(input);
  }

  return navigationContainer;
};

export default NavigationBar;
