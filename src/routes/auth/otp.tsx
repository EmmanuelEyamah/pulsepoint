import { Otp } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/otp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Otp />;
}
