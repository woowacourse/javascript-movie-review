import ToastPopup from '../../components/ToastPopup/ToastPopup';

const ResponseValidator = (response: any) => {
  if (response.status === 401) {
    ToastPopup('API KEY 검증에 실패했습니다.');
  }
};

export default ResponseValidator;
