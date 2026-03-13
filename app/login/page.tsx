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
      title="Sign in to your HomeTrust Africa portal"
      description="Use the credentials issued to you by HomeTrust Africa operations. This portal is invite-only and designed for secure project oversight."
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
