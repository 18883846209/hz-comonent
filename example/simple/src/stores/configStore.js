import { observable, action } from "mobx";

export default class WarnStore {
  @observable
  config = "{}";

  @action
  getConfig(data) {
    this.config = data;
  }
}
