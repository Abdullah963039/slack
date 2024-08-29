import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

import { Doc } from "@root/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hint } from "@/components/hint";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex h-[50px] items-center justify-between gap-0.5 px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="transparent"
            className="w-auto overflow-hidden p-1.5 text-lg font-semibold"
            size="sm"
          >
            <span className="truncate">{workspace.name}</span>
            <ChevronDown className="ml-1 size-4 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem className="cursor-pointer capitalize">
            <div className="relative mr-2 flex size-9 items-center justify-center overflow-hidden truncate rounded-md bg-[#616061] text-xl font-semibold text-white">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">Active workspace</p>
            </div>
          </DropdownMenuItem>

          {isAdmin && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => {}}
              >
                <p className="truncate">
                  Invite people to{" "}
                  <span className="inline font-medium">{workspace.name}</span>
                </p>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => {}}
              >
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Hint side="bottom" label="Filter conversations">
          <Button variant="transparent" size="icon-sm">
            <ListFilter className="size-4" />
          </Button>
        </Hint>
        <Hint side="bottom" label="New message">
          <Button variant="transparent" size="icon-sm">
            <SquarePen className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
