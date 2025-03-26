export const handleBottomScroll = (callback: () => void) => {
  const OFFSET = 20;

  const currentScrollBottom = window.scrollY + window.innerHeight;
  const triggerPosition = document.body.offsetHeight - OFFSET;

  if (currentScrollBottom >= triggerPosition) {
    callback();
  }
};

export function bindScrollEvent(onScroll: () => void) {
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}
