import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-screen content-center justify-center">
      <SignUp />
    </div>
  );
}
