import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sidebarCollapsed } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-20" : "ml-80"
        }`}
      >
        <Topbar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
