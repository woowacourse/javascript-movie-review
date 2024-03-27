function removeAllChild(parentElement: HTMLElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

export default removeAllChild;
