"use client"; // Mark this as a client component

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function AuthButton() {
  const router = useRouter();

  async function handleSignIn() {
    const response = await fetch('/api/auth/spotify');
    const { url } = await response.json();

    if (url) {
      router.push(url);
    } else {
      console.error('Failed to get the sign-in URL');
    }
  }

  return (
    <Button type="button" onClick={handleSignIn}>
      Sign in with Spotify
    </Button>
  );
}
