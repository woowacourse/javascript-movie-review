import ERRORS from '../../constants/messages';
import './ErrorMessage.css';

const createErrMsg = () => {
  const $errMsg = document.createElement('p');
  $errMsg.classList.add('err-msg');
  return $errMsg;
};

const ErrorMessage = () => {
  const $errMsg = createErrMsg();

  const render = (statusCode: number) => {
    const message = ERRORS[statusCode] ?? 'Oops! Something went wrong 🫣';

    $errMsg.textContent = `${statusCode}: ${message}`;

    return $errMsg;
  };

  return {
    render,
  };
};

export default ErrorMessage;
