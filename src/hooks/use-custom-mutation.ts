import { useMutation } from 'convex/react'
import { useCallback, useMemo, useState } from 'react'
import { FunctionReference } from 'convex/server'

type MutationOptions<T> = {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  onSettled?: () => void
  throwError?: boolean
}

type MutationStatus = 'success' | 'pending' | 'error' | 'settled'

export function useCustomMutation<TRequest, TResponse>(
  mutateFn: FunctionReference<'mutation'>,
) {
  const [data, setData] = useState<TResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<MutationStatus | null>(null)

  const isPending = useMemo(() => status === 'pending', [status])
  const isSuccess = useMemo(() => status === 'success', [status])
  const isSettled = useMemo(() => status === 'settled', [status])
  const isError = useMemo(() => status === 'error', [status])

  const mutation = useMutation(mutateFn)

  const mutate = useCallback(
    async (values: TRequest, options?: MutationOptions<TResponse>) => {
      try {
        setData(null)
        setError(null)

        setStatus('pending')

        const response = await mutation(values)
        options?.onSuccess?.(response)

        setStatus('success')
        return response as TResponse | null
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
    [mutation],
  )

  return { mutate, error, data, isPending, isSuccess, isSettled, isError }
}
