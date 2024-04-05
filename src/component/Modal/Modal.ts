import { $ } from '../../util/selector';
import { createModalBackdrop, createModalContainer } from './ModalLayout';
import renderMovieDetailModal from './MovieDetailModal';

type ModalName = 'movieDetail';

// TODO: 타입 수정, 임시로 반환하는 콜백 수정
const MODAL_LIST: Record<ModalName, any> = {
  movieDetail: (props: any) => renderMovieDetailModal(props),
};

function openModal(modalName: ModalName, props: any) {
  const backdrop = createModalBackdrop();
  const container = createModalContainer();

  backdrop.append(container);
  document.body.append(backdrop);

  MODAL_LIST[modalName](props);

  backdrop.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeModal(modalName);
  });

  // document.body.style.overflow = 'hidden'; // 해당 방식은 스크롤이 사라졌다 나타나면서 움직이는 현상 존재
  document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
}

function closeModal(modalName?: ModalName) {
  $('.modal-backdrop').remove();

  const scrollY = document.body.style.top;
  document.body.style.cssText = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
}

export { openModal, closeModal };
