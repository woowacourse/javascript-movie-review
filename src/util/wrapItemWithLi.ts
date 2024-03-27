function wrapItemWithLi(elementList: Array<HTMLElement>) {
  return elementList.map((element) => {
    const li = document.createElement('li');
    li.append(element);

    return li;
  });
}

export default wrapItemWithLi;
