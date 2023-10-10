import Cookies from "js-cookie";
import { create } from "zustand";

import { UserState } from "@/types/users/user.interface";
import { getGlobalState } from "@/utils/getGlobal";

const useUser = create<UserState>((set) => ({
  ...getGlobalState(),
  username: "Super Admin",
  logged: !!Cookies.get("user_ct"),
  setUserItem: (key) => set(key),
}));

export default useUser;
