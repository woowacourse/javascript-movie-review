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
`;

    el.appendChild(skeletonUl);
  },
  remove: (el: Element) => {
    const skeletonUl = el.querySelector(".skeleton-list");
    if (skeletonUl) {
      skeletonUl.remove();
    }
  }
}
export default Skeleton;
