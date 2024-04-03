import loader from '../asset/loader.gif';

function createLoader() {
  const loader$ = document.createElement('img');
  loader$.src = loader;
  loader$.classList.add('loader');

  return loader$;
}

export default createLoader;
