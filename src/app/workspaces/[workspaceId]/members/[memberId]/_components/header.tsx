import { FaChevronDown } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface HeaderProps {
  memberName?: string
  memberImage?: string
  onClick?: () => void
}

export const Header = ({
  memberImage,
  memberName = 'Member',
  onClick,
}: HeaderProps) => {
  return (
    <header className="flex h-12 items-center overflow-hidden border-b bg-white px-4">
      <Button
        variant="ghost"
        className="w-auto overflow-hidden px-2 text-lg font-semibold"
        size="sm"
        onClick={onClick}
      >
        <Avatar className="mr-2 size-6">
          <AvatarImage src={memberImage} />
          <AvatarFallback>{memberName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="truncate">{memberName}</span>
        <FaChevronDown className="ml-2 size-2.5" />
      </Button>
    </header>
  )
}
