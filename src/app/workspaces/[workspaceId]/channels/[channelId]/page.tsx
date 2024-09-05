interface ChannelIdPageProps {
  params: {
    workspaceId: string
    channelId: string
  }
}

function ChannelIdPage({ params }: ChannelIdPageProps) {
  return (
    <div>
      <p>workspace: {params.workspaceId}</p>
      <p>channel: {params.channelId}</p>
    </div>
  )
}
export default ChannelIdPage
