'use client'

import { AlertTriangle } from 'lucide-react'

interface ErrorBoundryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundry({}: ErrorBoundryProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-destructive/10 text-destructive">
      <AlertTriangle className="size-16" />
      <span className="text-lg">Sorry, something went wrong!</span>
    </div>
  )
}
