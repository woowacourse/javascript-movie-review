export function hideskeleton() {
    const skeletonItem: NodeListOf<HTMLElement> = document.querySelectorAll('.skeleton-image')
  
    skeletonItem.forEach((element: HTMLElement) => {
      
        element.style.opacity = '0';
        element.style.display = 'none';
    });
  };


  
export default hideskeleton