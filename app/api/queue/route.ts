import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Track {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
}

interface SpotifyQueueResponse {
  currentlyPlaying: Track | null;
  nextInQueue: Track[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SpotifyQueueResponse | { error: string }>) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    // Get the current playing track and the queue
    const queueResponse = await axios.get<{ currently_playing: Track | null; queue: Track[] }>(
      'https://api.spotify.com/v1/me/player/queue',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { currently_playing: currentlyPlaying, queue } = queueResponse.data;

    // Return the currently playing song and the next 3 queued songs
    res.status(200).json({
      currentlyPlaying,
      nextInQueue: queue.slice(0, 3), // Get the next 3 songs in the queue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}
