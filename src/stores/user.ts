import { create } from "zustand";

import { UserState } from "@/types/users/user.interface";
import { getGlobalState } from "@/utils/getGlobal";

const useUser = create<UserState>((set) => ({
  ...getGlobalState(),
  username: "Super Admin",
  logged: false,
  setUserItem: (key) => set(key),
}));

export default useUser;
