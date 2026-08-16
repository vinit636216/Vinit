import { auth, signOut } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";
import { Toaster } from "@/components/ui/sonner";

async function logout() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  const userName = session.user.name ?? session.user.email ?? "Admin";

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <AdminMobileNav userName={userName} logout={logout} />
      <AdminSidebar userName={userName} logout={logout} />
      <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-10">{children}</main>
      <Toaster />
    </div>
  );
}
