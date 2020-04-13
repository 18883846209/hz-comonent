import { observable, action } from "mobx";

export default class ExecuteStore {
  @observable
  currentData = {};

  @action
  setData(data) {
    this.currentData = data
  }
}