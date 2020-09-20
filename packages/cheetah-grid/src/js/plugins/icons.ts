import type { IconDefine } from "../ts-types";
// swk 2020.9.1
export const icons: { [key: string]: IconDefine } = {
  get arrow_up(): IconDefine {
    return require("cheetah-grid-icon-svg-loader!material-design-icons/navigation/svg/production/ic_arrow_drop_up_48px.svg");
  },
  get arrow_down(): IconDefine {
    return require("cheetah-grid-icon-svg-loader!material-design-icons/navigation/svg/production/ic_arrow_drop_down_48px.svg");
  },
  get info_outline(): IconDefine {
    return require("cheetah-grid-icon-svg-loader!material-design-icons/action/svg/production/ic_info_outline_48px.svg");
  }
};
