'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { useCreateChannelModal } from '../store/create-channel-modal'
import { CreateChannelForm } from './forms/create-channel-form'

export const CreateChannelModal = () => {
  const { isOpen, onClose } = useCreateChannelModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <CreateChannelForm />
      </DialogContent>
    </Dialog>
  )
}
