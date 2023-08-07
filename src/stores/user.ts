import { create } from "zustand";

import { UserState } from "@/interfaces/users/user.interface";
import { getGlobalState } from "@/utils/getGlobal";

const useUser = create<UserState>((set) => ({
  ...getGlobalState(),
  username: "Admin",
  logged: true,
  setUserItem: (key) => set(key),
}));

export default useUser;
