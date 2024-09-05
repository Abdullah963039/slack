import { create } from 'zustand'

type PreferencesModalState = {
  isOpen: boolean
  onOpen: (value?: string) => void
  onClose: () => void
  initialValue?: string
  updateValue: (value: string) => void
}

export const usePreferencesModal = create<PreferencesModalState>((set) => ({
  initialValue: undefined,
  isOpen: false,
  onOpen(value) {
    set({ isOpen: true, initialValue: value })
  },
  onClose() {
    set({ isOpen: false, initialValue: undefined })
  },
  updateValue(value) {
    set({ initialValue: value })
  },
}))
