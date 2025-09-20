import { PostRequest } from "@/pages/dashboard/PostRequest";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/post-request")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PostRequest />;
}
