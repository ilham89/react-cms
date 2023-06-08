import { create } from "zustand";

import { TagItem, TagState } from "@/interfaces/layouts/tagsView.interface";

const useHeaderTag = create<TagState>((set, get) => ({
  tags: [],
  activeTagId: "",
  setActiveTagId: (tag) => set({ activeTagId: tag }),
  addTag: (tagItem) => {
    const { tags, setActiveTagId } = get();
    const isExist = tags.filter((e) => e.path === tagItem.path);
    if (isExist.length === 0) {
      set({ tags: [...tags, tagItem] });
    }

    setActiveTagId(tagItem.path);
  },
  removeTag: (targetId) => {
    const { tags, activeTagId } = get();
    const tagList = tags.filter((tag) => tag.path !== targetId);
    if (tagList.length > 0) {
      if (activeTagId === targetId) {
        const index = tags.findIndex((e) => e.path == activeTagId);
        set({
          activeTagId: tags[index - 1].path,
          tags: tagList,
        });
      } else {
        set({
          tags: tagList,
        });
      }
    }
  },
  removeOtherTag: () => {
    const { tags, activeTagId } = get();
    const activeTag = tags.find((tag) => tag.path === activeTagId) as TagItem;
    const activeIsDashboard = activeTag?.path === tags[0].path;

    set({
      tags: activeIsDashboard ? [tags[0]] : [tags[0], activeTag],
    });
  },
  removeAllTag: () =>
    set((state) => ({
      tags: [state.tags[0]],
      activeTagId: state.tags[0].path,
    })),
}));

export default useHeaderTag;
