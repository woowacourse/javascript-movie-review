const ERROR_CONTAINER_ID = "error-container";
const RETRY_BUTTON_ID = "retry-button";

let errorContainer: HTMLElement | null = null;

const createErrorContainerTemplate = (message: string) => `
  <div id="${ERROR_CONTAINER_ID}" class="unexpected-container">
    <img alt="" src="./images/으아아행성이.png"/>
    <p>${message}</p>
    <button id=${RETRY_BUTTON_ID}>재시도</button>
  </div>
`;

export const renderErrorContainer = (parent: HTMLElement, message: string) => {
  if (errorContainer) {
    errorContainer.remove();
  }

  parent.insertAdjacentHTML("beforeend", createErrorContainerTemplate(message));
  errorContainer = document.getElementById(ERROR_CONTAINER_ID);

  errorContainer
    ?.querySelector(`#${RETRY_BUTTON_ID}`)
    ?.addEventListener("click", () => {
      window.location.reload();
    });
};

export const removeErrorContainer = () => {
  errorContainer?.remove();
  errorContainer = null;
};
