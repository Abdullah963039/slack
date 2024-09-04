"use client";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { PreferencesModal } from "@/features/workspaces/components/preferences-modal";

import { ClientProvider } from "./client-provider";

export const ModalsProvider = () => {
  return (
    <ClientProvider>
      <CreateWorkspaceModal />
      <PreferencesModal />
    </ClientProvider>
  );
};
