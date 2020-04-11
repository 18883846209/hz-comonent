import { observable, action } from "mobx";

export default class WarnStore {
  @observable
  newsFlag = false;

  @action
  changeFlag(flag) {
    this.newsFlag = flag;
  }
}
