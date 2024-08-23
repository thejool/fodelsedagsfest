'use client'

interface Track {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
}

interface FetchSpotifyQueueResponse {
  currentlyPlaying: Track | null;
  nextInQueue: Track[];
}

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { PlayIcon, PauseIcon, ThumbsUpIcon } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  votes: number
  duration: string
}

const VOTING_DURATION = 10 * 6 * 15 // 10 seconds for demonstration, change to 600 for 10 minutes

export default function Component() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [votingQueue, setVotingQueue] = useState<Song[]>([])
  const [playQueue, setPlayQueue] = useState<Song[]>([])
  const [newSong, setNewSong] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [countdown, setCountdown] = useState(VOTING_DURATION)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          if (votingQueue.length > 0) {
            const sortedQueue = [...votingQueue].sort((a, b) => b.votes - a.votes)
            const topSong = sortedQueue[0]
            setPlayQueue(prev => [...prev, topSong])
            setVotingQueue(prev => prev.filter(song => song.id !== topSong.id))
          }
          return VOTING_DURATION
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [votingQueue])

  useEffect(() => {
    const fetchSpotifyQueue = async (): Promise<FetchSpotifyQueueResponse | { error: string }> => {
      const response = await fetch('/api/spotify/queue');

      const data = await response.json();
      console.log('data')
      console.log(data)
      return data;
    };

    fetchSpotifyQueue()
  }, [])

  useEffect(() => {
    if (!currentSong && playQueue.length > 0) {
      setCurrentSong(playQueue[0])
      setPlayQueue(prev => prev.slice(1))
    }
  }, [currentSong, playQueue])

  const handleVote = (id: string) => {
    setVotingQueue(prev =>
      prev.map(song =>
        song.id === id ? { ...song, votes: song.votes + 1 } : song
      )
    )
  }

  const handleAddSong = () => {
    if (newSong.trim()) {
      const [title, artist] = newSong.split(' - ')
      const newSongObj: Song = {
        id: Date.now().toString(),
        title: title || newSong,
        artist: artist || 'Unknown Artist',
        votes: 0,
        duration: '3:30', // Placeholder duration
      }
      setVotingQueue(prev => [...prev, newSongObj])
      setNewSong('')
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Public Spotify Queue</h1>

      {/* Countdown Timer */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Next Song Selection In:</h2>
        <Progress value={(countdown / VOTING_DURATION) * 100} className="h-2" />
        <p className="text-sm text-center mt-1">
          {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
        </p>
      </div>

      {/* Current Song */}
      <div className="mb-6 p-4 bg-secondary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Now Playing</h2>
        {currentSong ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{currentSong.title}</p>
              <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
            </div>
            <Button onClick={togglePlayPause} variant="ghost" size="icon">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>
          </div>
        ) : (
          <p>No song playing</p>
        )}
      </div>

      {/* Voting Queue */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Voting Queue</h2>
        <ul className="space-y-2">
          {votingQueue.map(song => (
            <li key={song.id} className="flex items-center justify-between p-2 bg-muted rounded">
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{song.votes}</span>
                <Button onClick={() => handleVote(song.id)} variant="ghost" size="icon">
                  <ThumbsUpIcon className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Song Form */}
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Add song (Title - Artist)"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
        />
        <Button onClick={handleAddSong}>Add</Button>
      </div>
    </div>
  )
}