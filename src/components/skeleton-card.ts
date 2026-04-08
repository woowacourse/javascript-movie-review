export function createSkeletonList(count: number = 20): HTMLUListElement {
  const ul = document.createElement("ul");
  ul.className = "thumbnail-list";

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    fragment.appendChild(createSkeletonCard());
  }
  ul.appendChild(fragment);

  return ul;
}

function createSkeletonCard(): HTMLLIElement {
  const li = document.createElement("li");

  const item = document.createElement("div");
  item.className = "item skeleton";

  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail skeleton-box";

  const itemDesc = document.createElement("div");
  itemDesc.className = "item-desc";

  const rate = document.createElement("div");
  rate.className = "skeleton-box skeleton-rate";

  const title = document.createElement("div");
  title.className = "skeleton-box skeleton-title";

  itemDesc.append(rate, title);
  item.append(thumbnail, itemDesc);
  li.appendChild(item);

  return li;
}
