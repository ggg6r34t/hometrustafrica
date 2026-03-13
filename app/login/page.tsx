import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/forms";
import { AuthShell } from "@/components/auth/auth-shell";
import { getDashboardSession } from "@/lib/auth/session";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getDashboardSession();
  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;

  return (
    <AuthShell
      eyebrow="Secure access"
      title="Access your HomeTrust Africa dashboard"
      description="Sign in to review project progress, reports, budgets, documents, and secure client communications."
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
