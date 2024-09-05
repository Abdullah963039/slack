'use client'

import { FaCaretDown } from 'react-icons/fa'
import { Plus } from 'lucide-react'
import { useToggle } from 'react-use'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { cn } from '@/lib/utils'

interface WorkspaceSectionProps {
  label: string
  hint: string
  children: React.ReactNode
  onNew?: () => void
  defaultOpen?: boolean
}

export const WorkspaceSection = ({
  children,
  hint,
  label,
  onNew,
  defaultOpen = false,
}: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(defaultOpen)

  return (
    <div className="mt-3 flex flex-col px-2">
      <div className="group flex items-center px-3.5">
        <Button
          variant="transparent"
          className="size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc]"
          onClick={toggle}
        >
          <FaCaretDown
            className={cn('size-4 transition-transform', !on && '-rotate-90')}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group h-7 items-center justify-start overflow-hidden text-sm text-[#f9edffcc]"
        >
          <span className="truncate">{label}</span>
        </Button>

        {!!onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant="transparent"
              size="icon-sm"
              className="ml-auto size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc] opacity-0 transition group-hover:opacity-100"
            >
              <Plus className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  )
}
