import { Device } from "../layouts/index.interface";

export interface UserState {
  username: string;
  logged: boolean;
  device: Device;
  collapsed: boolean;
  setUserItem: (userState: Partial<UserState>) => void;
}
