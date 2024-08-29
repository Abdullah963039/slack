import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ClientProvider } from "@/components/providers/client-provider";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateWorkspace } from "../api/use-create-workspace";
import { useCreateWorkspaceModal } from "../store/create-workspace-modal";
import { createWorkspaceSchema, CreateWorkspaceValues } from "./validation";

export const CreateWorkspaceForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkspace();
  const { onClose } = useCreateWorkspaceModal();

  const form = useForm<CreateWorkspaceValues>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const onSubmit = (values: CreateWorkspaceValues) => {
    mutate(values, {
      onSuccess(id) {
        onClose();
        router.replace(`/workspaces/${id}`);
        toast.success("Workspace created.");
      },
      onError() {},
      onSettled() {},
    });
  };

  return (
    <ClientProvider>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder={`Workspace name e.g. "Work", "Personal", "Home"`}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </ClientProvider>
  );
};
