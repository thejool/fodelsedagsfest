import React from 'react'
import { Button } from "@/components/ui/button"
import { createClient } from '@supabase/supabase-js'

export default function AuthButton() {
  const handleSignIn = async () => {
    const supabase = createClient(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`, `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)

    // In a real application, this would initiate the Spotify OAuth flow
    console.log("Initiating Spotify sign in")
    await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: `http://localhost:3000/spotify/auth/callback`,
      },
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-green-700 p-4">
      <div className="bg-background text-foreground rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-green-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">
          Join the Public Spotify Queue
        </h1>
        <p className="text-center mb-6">
          Sign in with your Spotify account to vote for songs and influence the playlist in real-time!
        </p>
        <Button
          onClick={handleSignIn}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Sign in with Spotify
        </Button>
        <p className="text-sm text-center mt-4 text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}