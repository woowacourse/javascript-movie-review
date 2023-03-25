class SkeletonCards {
  $ul = document.createElement("ul");

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$ul.classList = "skeleton-cards";

    this.$ul.innerHTML = this.getTemplate();
  }

  render($target) {
    $target.insertAdjacentElement("afterend", this.$ul);
  }

  getTemplate() {
    const skeleton = `
      <li>
        <a href="#"> 
          <div class="item-card"> 
            <div class="item-thumbnail skeleton"></div> 
            <div class="item-title skeleton"></div> 
            <div class="item-score skeleton"></div> 
          </div> 
        </a> 
      </li>`.repeat(20);

    return skeleton;
  }

  appear() {
    this.$ul.classList.remove("hidden");
  }

  hide() {
    this.$ul.classList.add("hidden");
  }
}

export default SkeletonCards;
