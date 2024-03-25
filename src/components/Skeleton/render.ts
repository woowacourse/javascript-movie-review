import createElement from '../../utils/createElement';

const createSkeletonContent = () => {
  const itemThumbnail = createElement('div', { className: 'item-thumbnail skeleton' });
  const itemTitle = createElement('div', { className: 'item-title skeleton' });
  const itemScore = createElement('div', { className: 'item-score skeleton' });
  const fragment = document.createDocumentFragment();
  fragment.appendChild(itemThumbnail);
  fragment.appendChild(itemTitle);
  fragment.appendChild(itemScore);
  return fragment;
};

export const renderSkeleton = () => {
  const itemCard = createElement('div', { className: 'item-card skeleton' });
  const skeletonContent = createSkeletonContent();

  itemCard.appendChild(skeletonContent);

  return itemCard;
};
