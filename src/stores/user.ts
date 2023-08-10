import { create } from "zustand";

import { UserState } from "@/interfaces/users/user.interface";
import { getGlobalState } from "@/utils/getGlobal";

const useUser = create<UserState>((set) => ({
  ...getGlobalState(),
  username: "Admin",
  menuList: [
    {
      code: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      path: "/dashboard",
    },
    {
      code: "documentation",
      label: "Documentation",
      icon: "documentation",
      path: "/documentation",
    },
    {
      code: "products",
      label: "Products",
      icon: "documentation",
      path: "/products",
    },
    {
      code: "brands",
      label: "Brands",
      icon: "documentation",
      path: "/brands",
    },
    {
      code: "permission",
      label: "Permission",
      icon: "permission",
      path: "/permission",
      children: [
        {
          code: "routePermission",
          label: "Route Permission",
          path: "/permission/route",
        },
        {
          code: "notFound",
          label: "404",
          path: "/permission/404",
        },
      ],
    },
  ],
  logged: false,
  setUserItem: (key) => set(key),
}));

export default useUser;
