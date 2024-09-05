'use client'

import { AlertTriangle } from 'lucide-react'

interface ErrorBoundryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundry({}: ErrorBoundryProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-destructive">
      <AlertTriangle className="size-5" />
      <span className="text-sm">Sorry, something went wrong!</span>
    </div>
  )
}
