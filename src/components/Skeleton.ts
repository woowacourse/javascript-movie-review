const Skeleton = {
  render: (el: Element) => {
    const skeletonUl = document.createElement("ul");
    skeletonUl.classList.add("skeleton-list");
    skeletonUl.innerHTML = `
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
`;

    el.appendChild(skeletonUl);
  },
  remove: () => {
    const skeletonUl = document.querySelector(".skeleton-list");
    if (skeletonUl) {
      skeletonUl.remove();
    }
  }
}
export default Skeleton;
