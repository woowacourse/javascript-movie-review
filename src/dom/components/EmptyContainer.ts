const EMPTY_CONTAINER_ID = "empty-container";

let emptyContainer: HTMLElement | null = null;

const createEmptyContainerTemplate = (message: string) => `
  <div id="${EMPTY_CONTAINER_ID}" class="unexpected-container">
    <img alt="" src="./images/으아아행성이.png"/>
    <p>${message}</p>
  </div>
`;

export const renderEmptyContainer = (parent: HTMLElement, message: string) => {
  if (emptyContainer) {
    emptyContainer.remove();
  }

  parent.insertAdjacentHTML("beforeend", createEmptyContainerTemplate(message));
  emptyContainer = document.getElementById(EMPTY_CONTAINER_ID);
};

export const removeEmptyContainer = () => {
  emptyContainer?.remove();
  emptyContainer = null;
};
