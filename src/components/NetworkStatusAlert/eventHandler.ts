import removeHTMLElements from '../../utils/removeHTMLElements';
import NetworkStatusAlert from './NetworkStatusAlert';

const toggleButtonAndAlert = (isOnline: boolean) => {
  const showModalButton = document.querySelector('.btn') as HTMLButtonElement | null;
  if (showModalButton) showModalButton.disabled = !isOnline;
  isOnline ? removeHTMLElements('.network-status-alert-container') : NetworkStatusAlert();
};

const networkStatusEventHandler = () => {
  window.addEventListener('online', () => toggleButtonAndAlert(true));
  window.addEventListener('offline', () => toggleButtonAndAlert(false));
};

export default networkStatusEventHandler;
