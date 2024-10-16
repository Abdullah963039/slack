import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ConversationHeroProps {
  name?: string
  image?: string
}

export const ConversationHero = ({
  image,
  name = 'Member',
}: ConversationHeroProps) => {
  return (
    <div className="mx-5 mb-4 mt-[88px]">
      <div className="mb-2 flex items-center gap-x-1">
        <Avatar className="mr-2 size-14">
          <AvatarImage src={image} />
          <AvatarFallback className="text-2xl font-bold">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="mb-2 flex items-center text-2xl font-bold">{name}</p>
      </div>
      <p className="mb-4 font-normal text-slate-800">
        This conversation is just between you and <strong>{name}</strong>
      </p>
    </div>
  )
}
