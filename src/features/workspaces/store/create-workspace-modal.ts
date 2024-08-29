import { create } from "zustand";

type CreateWorkspaceModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateWorkspaceModal = create<CreateWorkspaceModalState>(
  (set) => ({
    isOpen: false,
    onOpen() {
      set({ isOpen: true });
    },
    onClose() {
      set({ isOpen: false });
    },
  }),
);
