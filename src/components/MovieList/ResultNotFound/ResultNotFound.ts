import './ResultNotFound.css';

const createTitle = () => {
  const $p = document.createElement('p');
  $p.classList.add('result-not-found');
  return $p;
};

const createInfo = () => {
  const $info = document.createElement('p');
  $info.innerHTML =
    '단어의 철자가 정확한지 확인해 보세요.<br/>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.<br/>두 단어 이상의 검색어의 경우, 띄어쓰기를 확인해 보세요.';
  $info.classList.add('info-msg');
  return $info;
};

const ResultNotFound = () => {
  const $title = createTitle();
  const $info = createInfo();

  return {
    render: () => {
      $title.textContent = '검색 결과를 찾지 못했습니다.';
      $title.appendChild($info);
      return $title;
    },
  };
};

export default ResultNotFound;
