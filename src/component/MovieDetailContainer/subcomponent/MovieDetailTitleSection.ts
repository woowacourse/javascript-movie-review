import createButton from '../../Button/Button';

export default function MovieDetailTitleSection({ title, onClose }: { title: string; onClose: () => void }) {
  const section = document.createElement('section');
  section.id = 'modal__movie-detail__title';

  const titleElement = document.createElement('h2');
  titleElement.classList.add('title');
  titleElement.textContent = title;

  const closeButton = createButton({
    options: { type: 'button', id: 'modal__movie-detail__close-button', textContent: '' },
    eventType: {
      type: 'click',
      callbackFunction: onClose,
    },
  });

  section.append(titleElement, closeButton);
  return section;
}
