import { Home } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Home />;
}
