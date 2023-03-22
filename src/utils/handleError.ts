import ErrorModal from '../components/ErrorModal';
import { $ } from './dom';

export const handleError = (message: string) => {
  const errorModal = $<ErrorModal>('error-modal');
  errorModal.render(message);
};
