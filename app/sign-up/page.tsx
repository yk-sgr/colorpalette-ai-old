import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}
