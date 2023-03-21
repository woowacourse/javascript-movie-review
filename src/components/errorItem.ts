import { IMAGE_URL } from '../constants/constants';

const errorItem = (result: string, status?: number) => {
  const imageUrl = result === 'FETCH_FAIL' ? IMAGE_URL.ERROR_RESULT : IMAGE_URL.NO_RESULT;

  return `
    <div id="error-item">
      <img src="${imageUrl}" alt="${result}" id="no-result-image"/>
      <p>검색 결과가 없습니다.</p>
    </div>`;
};

export default errorItem;
