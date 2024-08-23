import axios from 'axios';

import { createClient } from '@supabase/supabase-js';


export async function GET() {
  try {
    const supabase = createClient(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
      `${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    );

    const { data, error } = await supabase
      .from('spotify_tokens')
      .select('refresh_token')
      .single();

    if (error) {
      throw new Error('Error fetching refresh token from Supabase');
    }

    const refreshToken = data.refresh_token;
    console.log('data')
    console.log(data)

    // Step 2: Refresh the Spotify token
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
  });

  const accessToken = tokenResponse.data.access_token;

  // Step 3: Fetch the Spotify queue
  const queueResponse = await axios.get('https://api.spotify.com/v1/me/player/queue', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const queue = queueResponse.data.queue;

  // Step 4: Get the next 3 songs in the queue
  const nextThreeSongs = queue.slice(0, 3);

    // Step 5: Respond with the next 3 songs
  return Response.json({ data: nextThreeSongs })
  } catch (error: any) {
    console.error('Error fetching Spotify queue:', error.response?.data || error.message);
    return Response.json({ status: 500, data:  'Failed to fetch Spotify queue' })
  }
}