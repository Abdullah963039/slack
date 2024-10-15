import { XIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ThumbnailProps {
  url?: string | null
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative my-2 max-w-[360px] cursor-zoom-in overflow-hidden rounded-lg border">
          <img
            src={url}
            alt="Message image"
            className="size-full rounded-md object-cover"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message image"
          className="size-full rounded-md object-cover"
        />
      </DialogContent>
    </Dialog>
  )
}
