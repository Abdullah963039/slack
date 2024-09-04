'use client'

import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

import { usePreferencesModal } from '../store/preferences-modal'
import { useRemoveWorkspace } from '../api/use-remove-workspace'
import { useUpdateWorkspace } from '../api/use-update-workspace'
import { updateWorkspaceSchema, UpdateWorkspaceValues } from './validation'
import { useConfirm } from '@/hooks/use-confirm'

export const PreferencesModal = () => {
  const workspaceId = useWorkspaceId()
  const { isOpen, onClose, initialValue } = usePreferencesModal()
  const [ConfirmDeleteWorkspaceDialog, confirm] = useConfirm(
    'Are you sure?',
    'This action irreversible.'
  )

  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useRemoveWorkspace()

  const router = useRouter()

  async function handleDelete() {
    const ok = await confirm()

    if (!ok) return

    deleteWorkspace(
      { id: workspaceId },
      {
        onSuccess() {
          toast.success('Workspace deleted.')
          router.replace('/')
          onClose()
        },
        onError() {
          toast.error('Failed to delete workspace!')
        }
      }
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="overflow-hidden bg-gray-50 p-0">
          <DialogHeader className="border-b bg-white p-4">
            <DialogTitle>{initialValue}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <EditWorkspaceForm />

            <button
              disabled={isDeletingWorkspace}
              onClick={handleDelete}
              className="flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50"
            >
              <Trash className="size-4" />
              <p className="text-sm font-semibold">Delete workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmDeleteWorkspaceDialog />
    </>
  )
}

//* Update Workspace inner modal
function EditWorkspaceForm() {
  const [editOpen, setEditOpen] = useState(false)
  const workspaceId = useWorkspaceId()

  const { updateValue, initialValue } = usePreferencesModal()
  const { mutate, isPending } = useUpdateWorkspace()

  const form = useForm<UpdateWorkspaceValues>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: { name: initialValue }
  })

  function onSubmit({ name }: UpdateWorkspaceValues) {
    mutate(
      { id: workspaceId, name },
      {
        onSuccess() {
          toast.success('Workspace updated.')
          updateValue(name)
          setEditOpen(false)
        },
        onError() {
          toast.error('Failed to update workspace!')
        }
      }
    )
  }

  return (
    <>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Workspace name</p>
              <p className="text-sm font-semibold text-[#1264a3] hover:underline">
                Edit
              </p>
            </div>
            <p className="text-sm">{initialValue}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename this workspace</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              id="edit-workspace"
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder={`Workspace name e.g. "Work", "Personal", "Home"`}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pb-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  formTarget="edit-workspace"
                  disabled={isPending}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
