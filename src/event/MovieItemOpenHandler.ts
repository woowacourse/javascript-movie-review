const MovieItemOpenHandler = (element: HTMLElement, openModal: (id: number) => void) => {
  element.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const item = target.closest("div.item");

    if (item) openModal(Number(item.id));
  });
};

export default MovieItemOpenHandler;
