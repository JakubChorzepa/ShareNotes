import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen content-center justify-center">
      <SignIn />
    </div>
  );
}
