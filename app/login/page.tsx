'use client';
import { SignInButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <h1 className="text-4xl font-bold mb-4 white">Welcome to QR Scanner</h1>
      <p className="text-lg mb-6 white">Scan QR codes effortlessly with our app.</p>
      <SignInButton mode="modal">
        <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Sign In to Continue
        </button>
      </SignInButton>
    </div>
  );
}
