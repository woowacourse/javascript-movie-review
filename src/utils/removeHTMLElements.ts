const removeHTMLElements = (target: string) => {
  const targetNode = document.querySelectorAll(target);
  if (!targetNode) return;
  targetNode.forEach((item) => {
    item.remove();
  });
};

export default removeHTMLElements;
