import { create } from 'zustand'

type CreateChannelModalState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useCreateChannelModal = create<CreateChannelModalState>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true })
  },
  onClose() {
    set({ isOpen: false })
  }
}))
