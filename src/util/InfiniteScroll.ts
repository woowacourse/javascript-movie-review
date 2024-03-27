import { getDomElement } from './DOM';

async function setupInfiniteScroll(
  listEnd: HTMLElement,
  mountItems: (listEnd: HTMLElement, search?: string) => Promise<void>,
  search?: string,
) {
  const onIntersect: IntersectionObserverCallback = async (entries) => {
    entries.forEach(async (entry) => {
      getDomElement('.list-end').innerText = '🍿 영화 데이터를 불러오는 중입니다 🍿';
      if (entry.isIntersecting) {
        setTimeout(
          async () => await mountItems(listEnd, search).then(() => (getDomElement('.list-end').innerText = '')),
          500,
        );
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect);
  observer.observe(listEnd);
}

export default setupInfiniteScroll;
