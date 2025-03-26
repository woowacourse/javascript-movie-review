const setPageScroll = (option: boolean) => {
  if (option) document.body.style.overflow = "auto";
  else document.body.style.overflow = "hidden";
};

export default setPageScroll;
