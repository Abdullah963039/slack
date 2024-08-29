interface WorkspaceIdPageProps {
  params: { workspaceId: string };
}

export default function WorkspaceIdPage({ params }: WorkspaceIdPageProps) {
  return <div>workspaceId: {params.workspaceId}</div>;
}
