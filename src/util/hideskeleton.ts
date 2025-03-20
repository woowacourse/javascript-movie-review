export function hideskeleton() {
    const skeletonItem: NodeListOf<HTMLElement> = document.querySelectorAll('.skeleton-image')
  
    skeletonItem.forEach((element: HTMLElement) => {
      
      setTimeout(() => {
        element.style.opacity = '0';
        element.style.display = 'none';
      }, 300);
    });
  };


  
export default hideskeleton