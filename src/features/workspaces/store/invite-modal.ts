import { create } from 'zustand'

type InviteModalState = {
  isOpen: boolean
  onOpen: (args: { joinCode: string; name: string }) => void
  onClose: () => void
  joinCode?: string
  name?: string
  updateCode: (code: string) => void
}

export const useInviteModal = create<InviteModalState>((set) => ({
  name: undefined, //* Refer to workspace name.
  joinCode: undefined, //* Refer to workspace join code.
  isOpen: false,
  onOpen(args) {
    set({ isOpen: true, ...args })
  },
  onClose() {
    set({ isOpen: false, name: undefined, joinCode: undefined })
  },
  updateCode(joinCode) {
    set({ joinCode })
  },
}))
