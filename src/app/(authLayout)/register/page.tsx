import { Signup1 } from "@/components/modules/authentication/signup1";

export default function SignUpPage() {
  return (
    <div>
      <Signup1
        heading="SignUp"
        logo={{
          url: "/register",
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
          alt: "Food Hub Logo",
          title: "Food Hub",
        }}
        signupUrl="/register"
        buttonText="Register to your account"
      ></Signup1>
    </div>
  );
}
