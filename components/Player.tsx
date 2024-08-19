import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


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


export function Player() {
  const fetchSpotifyQueue = async (): Promise<FetchSpotifyQueueResponse | { error: string }> => {
    const response = await fetch('/api/spotify-queue', {
      headers: {
        Authorization: 'Bearer YOUR_SPOTIFY_ACCESS_TOKEN',
      },
    });

    const data = await response.json();
    return data;
  };
  React.useEffect(() => {
    fetchSpotifyQueue()
  }, [fetchSpotifyQueue])
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
