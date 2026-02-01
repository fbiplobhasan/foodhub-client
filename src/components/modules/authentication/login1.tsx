"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface Login1Props {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Login1 = ({
  heading = "Login",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
  className,
}: Login1Props) => {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:"http://localhost:3000"
      });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <Link href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </Link>
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <Input
              type="email"
              placeholder="Email"
              className="text-sm"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className="text-sm"
              required
            />
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
            <Button
              className="w-full"
              onClick={() => handleGoogleLogin()}
              variant="outline"
              type="button"
            >
              Continue with Google
            </Button>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <span>{signupText}</span>
            <Link
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login1 };
