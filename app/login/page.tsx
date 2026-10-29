// src/app/login/page.tsx
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-primary/20 to-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tl from-secondary/20 to-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <Card className="relative w-full max-w-md overflow-hidden border-border/70 bg-card shadow-[0_24px_60px_-35px_rgba(26,26,26,0.35)]">
        {/* Card glow effect */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <CardHeader className="relative text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">
            Welcome to CliperPro
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground/80">
            Your AI-powered workspace for clips, summaries, and more.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative space-y-6 pt-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/library" });
            }}
          >
            <Button
              type="submit"
              className="h-12 w-full rounded-md bg-primary text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/60 px-2 text-muted-foreground/60">
                secure authentication
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground/70">
            By continuing, you agree to our{" "}
            <span className="underline underline-offset-2 hover:text-foreground cursor-pointer transition-colors">
              Terms
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            .
          </p>
        </CardContent>

        <CardFooter className="relative justify-center border-t border-border/30 bg-muted/20 py-4">
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <span className="font-medium text-primary">
              Your account will be created automatically.
            </span>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
