enum DeviceList {
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
}

export type Device = keyof typeof DeviceList;
