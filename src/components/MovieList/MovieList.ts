import './MovieList.css';

const MovieList = () => {
  document.dispatchEvent(
    new CustomEvent('popular', {
      bubbles: true,
    }),
  );

  return {
    render: () => {
      const $section = document.createElement('section');
      $section.classList.add('item-view');

      const $title = document.createElement('h2');

      const $ul = document.createElement('ul');
      $ul.classList.add('item-list');

      $section.appendChild($title);
      $section.appendChild($ul);

      return $section;
    },
  };
};
export default MovieList;
