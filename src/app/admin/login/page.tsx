import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/admin");

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/admin/login?error=1&callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
    throw error;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";
  const callbackUrl = params.callbackUrl ?? "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-surface p-8">
        <p className="mb-1 font-display text-xs font-bold uppercase tracking-widest text-primary">
          Vinit V Balgum
        </p>
        <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">
          Admin Login
        </h1>

        {hasError && (
          <p className="mb-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
            Invalid email or password.
          </p>
        )}

        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-foreground transition hover:bg-primary-dark"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
