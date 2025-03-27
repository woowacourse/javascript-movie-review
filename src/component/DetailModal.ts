import createDOMElement from "../util/createDomElement";

const DetailModal = () => {
  return createDOMElement({
    tag: "div",
    class: "modal-background active",
    id: "modalBackground",
    children: createDOMElement({
      tag: "div",
      class: "modal",
      children: [
        createDOMElement({
          tag: "button",
          class: "close-modal",
          id: "closeModal",
          children: createDOMElement({
            tag: "img",
            src: "./images/modal_button_close.png",
          }),
        }),
        createDOMElement({
          tag: "div",
          class: "modal-container",
          children: [
            createDOMElement({
              tag: "div",
              class: "modal-image",
              children: createDOMElement({
                tag: "img",
                src: "https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg",
              }),
            }),
            createDOMElement({
              tag: "div",
              class: "modal-description",
              children: [
                createDOMElement({
                  tag: "h2",
                  textContent: "인사이드 아웃 2",
                }),
                createDOMElement({
                  tag: "p",
                  textContent: "2024 · 모험, 애니메이션, 코미디, 드라마, 가족",
                }),
                createDOMElement({
                  tag: "p",
                  children: [
                    createDOMElement({
                      tag: "img",
                      src: "./images/star_filled.png",
                      class: "star",
                    }),
                    createDOMElement({
                      tag: "span",
                      textContent: "7.7",
                    }),
                  ],
                }),
                createDOMElement({
                  tag: "hr",
                }),
                createDOMElement({
                  tag: "p",
                  class: "detail",
                  textContent: `13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤 본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’,
                    ‘까칠’, ‘소심’. 그러던 어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가 본부에 등장하고, 언제나
                    최악의 상황을 대비하며 제멋대로인 ‘불안’이와 기존 감정들은 계속 충돌한다. 결국 새로운 감정들에 의해
                    본부에서 쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한 모험을 시작하는데…`,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};

export default DetailModal;
