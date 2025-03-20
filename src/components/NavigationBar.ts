type NavigationBarProps = {
  input: HTMLDivElement;
};

const NavigationBar = ({ input }: NavigationBarProps) => {
  const navigationContainer = document.createElement("div");
  navigationContainer.classList.add("navigation-container");

  navigationContainer.innerHTML = `
        <h1 class="logo">
          <img src="images/logo.png" alt="MovieList" />
        </h1>
      `;

  navigationContainer.appendChild(input);

  return navigationContainer;
};

export default NavigationBar;
