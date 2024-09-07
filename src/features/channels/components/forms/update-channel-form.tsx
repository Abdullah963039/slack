'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useChannelId } from '@/hooks/use-channel-id'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

import { useUpdateChannel } from '../../api/use-update-channel'
import { updateChannelSchema, type UpdateChannelValues } from './validation'

interface UpdateChannelFormProps {
  initialValue: string
}

export const UpdateChannelForm = ({ initialValue }: UpdateChannelFormProps) => {
  const channelId = useChannelId()
  const workspaceId = useWorkspaceId()
  const { data: member } = useCurrentMember({ workspaceId })
  const [open, setOpen] = useState(false)

  function handleOpen(value: boolean) {
    if (member?.role !== 'admin') return

    setOpen(value)
  }

  const form = useForm<UpdateChannelValues>({
    resolver: zodResolver(updateChannelSchema),
    defaultValues: { name: initialValue },
  })

  const { mutate, isPending } = useUpdateChannel()

  function onSubmit({ name }: UpdateChannelValues) {
    mutate(
      { name, id: channelId },
      {
        onSuccess(id) {
          toast.success('Channel updated successfuly.')
          handleClose()
        },
        onError() {
          toast.error('Something went wrong while update channel!')
        },
      },
    )
  }

  function handleClose() {
    form.reset({ name: '' })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 transition hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Channel name</p>
            <p className="text-sm font-semibold text-[#1264a3] hover:underline">
              Edit
            </p>
          </div>
          <p className="text-sm"># {initialValue}</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename this channel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="e.g. plan-budget"
                    {...field}
                    onChange={(e) => {
                      const transformedValue = e.target.value
                        .replace(/\s+/g, '-')
                        .toLowerCase()

                      field.onChange(transformedValue)
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
