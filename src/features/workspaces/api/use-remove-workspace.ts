import { useMutation } from 'convex/react'
import { useCallback, useMemo, useState } from 'react'

import { api } from '@root/convex/_generated/api'
import { Id } from '@root/convex/_generated/dataModel'

type Options = {
  onSuccess?: (data: TResponse) => void
  onError?: (error: Error) => void
  onSettled?: () => void
  throwError?: boolean
}

type TRequest = { id: Id<'workspaces'> }
type TResponse = Id<'workspaces'> | null

type MutationStatus = 'success' | 'pending' | 'error' | 'settled'

export const useRemoveWorkspace = () => {
  const [data, setData] = useState<TResponse>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<MutationStatus | null>(null)

  const isPending = useMemo(() => status === 'pending', [status])
  const isSuccess = useMemo(() => status === 'success', [status])
  const isSettled = useMemo(() => status === 'settled', [status])
  const isError = useMemo(() => status === 'error', [status])

  const mutation = useMutation(api.workspaces.remove)

  const mutate = useCallback(
    async (values: TRequest, options?: Options) => {
      try {
        setData(null)
        setError(null)

        setStatus('pending')

        const response = await mutation(values)
        options?.onSuccess?.(response)

        setStatus('success')
        return response
      } catch (err) {
        setStatus('error')
        setError(err as Error)

        options?.onError?.(err as Error)

        if (options?.throwError) throw err
      } finally {
        setStatus('settled')
        options?.onSettled?.()
      }
    },
    [mutation]
  )

  return { mutate, error, data, isPending, isSuccess, isSettled, isError }
}
