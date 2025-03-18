class Component {
    $target;
  
    constructor($target, props) {
      this.$target = $target;
      this.props = props;
      this.render();
    }
    template() {
      return "";
    }
  
    render() {
      this.$target.innerHTML = this.template();
      this.setEvent();
    }
  
    setEvent() {}
  }
  
  export default Component;
  