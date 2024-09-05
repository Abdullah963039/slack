import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { SignInValues, signInSchema } from './validation'

interface SignInFormProps {
  disabled?: boolean
  onSubmit: (values: SignInValues) => void
}

export const SignInForm = ({ disabled, onSubmit }: SignInFormProps) => {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const pending = form.formState.isSubmitting || disabled

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <Input
                disabled={pending}
                placeholder="Email"
                type="email"
                {...field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <Input
                disabled={pending}
                placeholder="Password"
                type="password"
                {...field}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button disabled={pending} type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  )
}
