import createButton from '../../Button/Button';

export default function MovieDetailTitleSection({ title, onClose }: { title: string; onClose: () => void }) {
  const section = document.createElement('section');
  section.classList.add('movie-detail-title-section');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('title');
  titleElement.textContent = title;

  const closeButton = createButton({
    options: { type: 'button', id: 'movie-detail-close-button', textContent: '' },
    callbackFunction: onClose,
  });

  section.append(titleElement, closeButton);
  return section;
}
