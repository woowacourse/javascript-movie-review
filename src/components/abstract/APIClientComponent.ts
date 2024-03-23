import EventComponent from "./EventComponent";

export default abstract class APIClientComponent extends EventComponent {
  async mount(): Promise<void> {
    await this.fetchRenderData();
    super.mount();
  }

  protected async fetchRenderData(): Promise<void> {
    throw Error("fetchRenderData 메서드가 구현되지 않았습니다.");
  }
}
