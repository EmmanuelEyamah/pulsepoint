import { Donors } from "@/pages/dashboard/Donors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/donors")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Donors />;
}
