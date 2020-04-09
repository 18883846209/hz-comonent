import { observable, action } from "mobx";

export default class WarnStore {
  @observable
  newsFlag = true;

  @action
  changeFlag(flag) {
    this.newsFlag = flag;
  }
}
