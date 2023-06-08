import { Device } from "../layouts/index.interface";
import { MenuList } from "../layouts/menu.interface";

export interface UserState {
  username: string;
  menuList: MenuList;
  logged: boolean;
  device: Device;
  collapsed: boolean;
  setUserItem: (userState: Partial<UserState>) => void;
}
