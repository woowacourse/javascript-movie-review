import './ErrorMessage.css';

const createErrMsg = () => {
  const $errMsg = document.createElement('p');
  $errMsg.classList.add('err-msg');
  return $errMsg;
};

const ErrorMessage = () => {
  const $errMsg = createErrMsg();

  const render = (statusCode: number) => {
    if (statusCode >= 400 && statusCode < 500)
      $errMsg.textContent = `${statusCode}: Page Not Found`;
    if (statusCode >= 500 && statusCode < 600)
      $errMsg.textContent = `${statusCode}: Server Error`;
    return $errMsg;
  };

  return {
    render,
  };
};

export default ErrorMessage;
