import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Sign in to continue to our fantastic app',
}

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-full w-full place-items-center bg-gradient-to-br from-purple-600 via-violet-500 to-blue-500 py-16">
      {children}
    </main>
  )
}
