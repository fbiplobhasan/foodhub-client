import { Login1 } from "@/components/modules/authentication/login1";

export default function LoginPage() {
  return (
    <div>
      <Login1
        heading="Welcome Back"
        logo={{
          url: "/login",
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
          alt: "Food Hub Logo",
          title: "Food Hub",
        }}
        signupUrl="/register"
        buttonText="Login to your account"
      />
    </div>
  );
}
