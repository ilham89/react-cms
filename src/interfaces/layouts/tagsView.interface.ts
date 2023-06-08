export type TagItem = {
  code: string;
  label: string;
  path: string;
  closable: boolean;
};

export interface TagState {
  tags: TagItem[];
  activeTagId: TagItem["path"];
  setActiveTagId: (tag: string) => void;
  addTag: (tagItem: TagItem) => void;
  removeTag: (targetId: string) => void;
  removeOtherTag: () => void;
  removeAllTag: () => void;
}
