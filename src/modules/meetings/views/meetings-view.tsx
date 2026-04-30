"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../ui/components/columns";
import { EmptyState } from "@/components/empty-state";
import { DataTable } from "@/components/data-table";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
           <DataTable data={data.items} columns={columns} />
           {data.items.length === 0 && (
                   <EmptyState 
                     title="Create your first meeting"
                     description="Create a meeting to join your agents. Each agent will follow your instructions and can interact with participants during the call."
                   />
                 )}
        </div>
    )
} 

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Something went wrong"
    />
  );
};
