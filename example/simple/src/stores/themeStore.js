import { observable, action } from "mobx";

export default class ThemeStore {
  @observable
  theme = "light";

  @action
  setTheme(newTheme) {
    this.theme = newTheme;
  }
}
