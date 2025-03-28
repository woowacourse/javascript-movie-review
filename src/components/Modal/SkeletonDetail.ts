const SkeletonDetail = {
  create() {
    const skeletonDetailElement = document.createElement("div");
    skeletonDetailElement.classList.add("modal-detail");
    const content = /*html*/ `
        <div class="modal-image">
            <div class="skeleton-poster"></div>
        </div>
        <div class="modal-description">
            
        </div>
    `;
    skeletonDetailElement.insertAdjacentHTML("beforeend", content);
    return skeletonDetailElement;
  },
};

export default SkeletonDetail;
