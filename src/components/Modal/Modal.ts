import { toggleVisibility } from "../../utils/Render";
import setPageScroll from "../../utils/setPageScroll";
import { $modal, $modalCloseButton, $modalContainer } from "./Element";
import ModalDetail from "./ModalDetail/ModalDetail";

const escapeEventListener = (e: KeyboardEvent) => {
  const targetKey = e.key;
  if (targetKey !== "Escape") return;
  Modal.hidden();
};

const Modal = {
  init() {
    $modal.addEventListener("click", (e) => {
      if (e.target === $modal) this.hidden();
    });
    $modalCloseButton.addEventListener("click", () => this.hidden());
    $modalContainer.appendChild(
      ModalDetail.create({
        posterPath: "/dUBxeDBAtr8kSIDDPD86aWqmHFr.jpg",
        category: ["애니메이션", "코미디", "모험"],
        title: "극장판 짱구는 못말려: 어른 제국의 역습",
        releaseYear: "2009",
        rate: 8.3,
        detail:
          "떡잎마을에 20세기 박물관이 생기자 어른들은 그곳에 푹 빠져 헤어 나오지 못한다. 그러던 어느 날, 20세기 박물관은 TV를 통해 중요한 안내 방송을 한다. 그때부터 어른들은 어린아이처럼 행동하기 시작하고, 다음 날 아침에는 박물관에서 보낸 트럭을 타고 단체로 사라진다. 그 이후 남겨진 아이들도 20세기 박물관에서 보낸 트럭에 실려 어딘가로 끌려가고, 짱구와 친구들은 이리저리 도망친다.  어른들을 찾으러 간 20세기 박물관에서 이 모든 일을 꾸민 켄을 만난다. 켄은 어른들이 20세기의 냄새에 취해 어린 시절로 돌아갔다고 하면서, 자신의 목표는 20세기를 되살리는 것이라고 한다. 한편, 짱구는 20세기 박물관에서 아버지와 어머니를 구하고, 한자리에 모인 짱구 가족들은 켄의 음모를 막기 위해 마지막 결전을 준비하는데...",
      })
    );
  },

  show() {
    toggleVisibility($modal, "show");
    setPageScroll(false);
    addEventListener("keydown", escapeEventListener);
  },

  hidden() {
    toggleVisibility($modal, "hidden");
    setPageScroll(true);
    removeEventListener("keydown", escapeEventListener);
  },
};

export default Modal;
