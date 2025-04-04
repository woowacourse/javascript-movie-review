import ErrorModal from "../../../shared/ui/components/ErrorModal";

export const intersectionObserver = (handler: () => Promise<void>) => {
  const target = document.getElementById("target") as HTMLElement;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const handleFetch = async () => {
          try {
            await handler();
          } catch (error) {
            ErrorModal("영화 리스트를 불러오는데 실패하였습니다.");
            observer.disconnect();
          }
        };

        handleFetch();
      }
    });
  });

  observer.observe(target);
};
