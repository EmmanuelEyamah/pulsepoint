import { ActiveRequests } from "@/pages/dashboard/ActiveRequests";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/active-requests")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ActiveRequests />;
}
