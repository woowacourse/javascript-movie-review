const setPageScroll = (isVisible: boolean) => {
  if (isVisible) document.body.style.overflowY = "auto";
  else document.body.style.overflowY = "hidden";
};

export default setPageScroll;
