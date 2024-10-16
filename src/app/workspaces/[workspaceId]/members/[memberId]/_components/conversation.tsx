import { Loader } from 'lucide-react'

import { Id } from '@root/convex/_generated/dataModel'

import { MessageList } from '@/components/message-list'
import { useGetMember } from '@/features/members/api/use-get-member'
import { useGetMessages } from '@/features/messages/api/use-get-messages'
import { useMemberId } from '@/hooks/use-member-id'

import { Header } from './header'
import { ChatInput } from './chat-input'

interface ConversationProps {
  id: Id<'conversations'>
}
export const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId()

  const { data: member, isLoading: loadingMember } = useGetMember({
    id: memberId,
  })

  const { results, status, loadMore } = useGetMessages({ conversationId: id })

  if (loadingMember || status === 'LoadingFirstPage')
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )

  return (
    <div className="flex h-full flex-col">
      <Header
        memberImage={member?.user.image}
        memberName={member?.user.name}
        onClick={() => {}}
      />

      <MessageList
        data={results}
        canLoadMore={status === 'CanLoadMore'}
        isLoadingMore={status === 'LoadingMore'}
        loadMore={loadMore}
        memberImage={member?.user.image}
        memberName={member?.user.name}
        variant="converstaion"
      />

      <ChatInput
        placeholder={`Message ${member?.user.name}`}
        conversationId={id}
      />
    </div>
  )
}
