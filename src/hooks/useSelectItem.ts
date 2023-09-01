import * as React from "react";

export const useSelectItem = () => {
  const [selectedItem, setSelectedItem] = React.useState<number>(-1);

  const onSelectItem = (id: number) => setSelectedItem(id);
  const onResetItem = () => setSelectedItem(-1);

  return {
    selectedItem,
    onSelectItem,
    onResetItem,
  };
};
