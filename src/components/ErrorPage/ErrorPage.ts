import { WRONG } from '../../resource';

interface Props {
  status?: number;
  message: string;
}

const ErrorPage = ({ status, message }: Props) => {
  const fragment = document.createDocumentFragment();
  const img = document.createElement('img');
  const statusText = document.createElement('span');
  const messageText = document.createElement('p');

  statusText.classList.add('status-number');
  messageText.classList.add('error-message');
  img.classList.add('error-image');

  img.src = WRONG;

  if (status) statusText.textContent = String(status);
  messageText.textContent = message;

  fragment.appendChild(img);
  fragment.appendChild(statusText);
  fragment.appendChild(messageText);

  return fragment;
};

export default ErrorPage;
