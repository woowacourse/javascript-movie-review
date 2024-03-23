import { ERROR } from '../../resource';

interface Props {
  status: string;
  message: string;
}

const ErrorPage = ({ status, message }: Props) => {
  const container = document.createElement('div');
  const img = document.createElement('img');
  const statusText = document.createElement('span');
  const messageText = document.createElement('span');

  container.classList.add('error');
  statusText.classList.add('status-number');
  messageText.classList.add('error-message');

  img.src = ERROR;

  statusText.textContent = status;
  messageText.textContent = message;

  container.appendChild(img);
  container.appendChild(statusText);
  container.appendChild(messageText);

  return container;
};

export default ErrorPage;
