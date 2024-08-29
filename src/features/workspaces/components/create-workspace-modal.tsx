"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateWorkspaceModal } from "../store/create-workspace-modal";
import { CreateWorkspaceForm } from "./create-workspace-form";

export const CreateWorkspaceModal = () => {
  const { onClose, isOpen } = useCreateWorkspaceModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="">
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <CreateWorkspaceForm />
      </DialogContent>
    </Dialog>
  );
};
