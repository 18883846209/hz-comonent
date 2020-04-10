import { observable, action } from "mobx";

export default class ExecuteStore {
  @observable
  isFirst = true;

  @action
  click() {
    if (this.isFirst) this.isFirst = false
  }
}