"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
  <div>
    {/* <ResponsiveDialog 
    title="Responsive Dialog"
    description="This is a responsive dialog that adapts to different screen sizes."
    open
    onOpenChange={(open) => console.log("Dialog open state:", open)}
    >
        <Button>
            actionn
        </Button>
    </ResponsiveDialog> */}
      {JSON.stringify(data, null, 2)}
  </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Something went wrong"
    />
  );
};
