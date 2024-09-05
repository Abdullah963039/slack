'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'

import { useCreateChannelModal } from '../../store/create-channel-modal'
import { useCreateChannel } from '../../api/use-create-channel'

import { createChannelSchema, CreateChannelValues } from './validation'

export const CreateChannelForm = () => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { onClose } = useCreateChannelModal()
  const { isPending, mutate } = useCreateChannel()

  const form = useForm<CreateChannelValues>({
    resolver: zodResolver(createChannelSchema)
  })

  function onSubmit({ name }: CreateChannelValues) {
    mutate(
      { name, workspaceId },
      {
        onSuccess(id) {
          toast.success('Channel created successfuly.')
          handleClose()
          router.push(`/workspaces/${workspaceId}/channels/${id}`)
        },
        onError() {
          toast.error('Something went wrong while create channel!')
        }
      }
    )
  }

  function handleClose() {
    form.reset({ name: '' })
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="flex justify-end">
          <Button disabled={isPending} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
