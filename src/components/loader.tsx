import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
  iconCn?: string
}
export const Loader = ({ className, iconCn }: LoaderProps) => {
  return (
    <div className={cn('flex h-full items-center justify-center', className)}>
      <LoaderIcon
        className={cn('size-6 animate-spin text-muted-foreground', iconCn)}
      />
    </div>
  )
}
