'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useAuthActions } from '@convex-dev/auth/react'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { SignUpForm } from './forms/sign-up-form'
import { SignUpValues } from './forms/validation'
import { AuthFlow } from '../types'

interface SignUpCardProps {
  setState: (value: AuthFlow) => void
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const { signIn } = useAuthActions()

  const onProvider = (provider: 'github' | 'google') => {
    setPending(true)
    signIn(provider).finally(() => {
      setPending(false)
    })
  }

  const onPasswordSignup = ({ email, password, name }: SignUpValues) => {
    setPending(true)

    signIn('password', { email, password, name, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong.')
      })
      .finally(() => {
        setPending(false)
      })
  }

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue.
        </CardDescription>

        {!!error && (
          <div className="mb-6 flex items-center justify-center gap-x-2 rounded-sm bg-destructive/20 p-3 text-sm text-destructive">
            <AlertTriangle className="size-5" />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <SignUpForm disabled={pending} onSubmit={onPasswordSignup} />
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            variant="outline"
            onClick={() => onProvider('google')}
            size="lg"
            className="relative w-full"
          >
            <FcGoogle className="absolute left-2.5 top-3 size-5" />
            Continue with Google
          </Button>

          <Button
            disabled={pending}
            variant="outline"
            onClick={() => onProvider('github')}
            size="lg"
            className="relative w-full"
          >
            <FaGithub className="absolute left-2.5 top-3 size-5" />
            Continue with Github
          </Button>
        </div>
        <div className="text-sm">
          Already have an account?{' '}
          <span
            role="button"
            className="font-medium text-sky-700 transition hover:underline"
            onClick={() => setState('signIn')}
          >
            Sign in
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
