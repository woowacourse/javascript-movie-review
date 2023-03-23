import { IMAGE_URL } from '../constants';

const errorItem = (isLastPage: boolean) => {
  const imageUrl = isLastPage ? IMAGE_URL.NO_RESULT : IMAGE_URL.ERROR_RESULT;

  return `
    <div id="error-item">
      <img src="${imageUrl}" alt="No search results" id="no-result-image"/>
      <p>Sorry🥹... No search results were found.</p>
    </div>`;
};

export default errorItem;
