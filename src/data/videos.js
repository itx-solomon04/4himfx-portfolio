/*
  ============================================================
  THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD YOUR VIDEOS.
  ============================================================

  Two kinds of video entries:

  1) YouTube / Vimeo-style embeds (type: "youtube")
     - id: the YouTube video ID (the part after "v=" in the URL,
       e.g. https://www.youtube.com/watch?v=zKTwnUe73hk -> "zKTwnUe73hk")
     - These autoplay muted, on loop, the moment they scroll into view,
       and pause automatically when scrolled away.

  2) Your own raw video files (type: "local")
     - src: path to the file inside /public/videos/
       e.g. put "reel.mp4" in public/videos/, then use "/videos/reel.mp4"
     - poster: an optional thumbnail image shown before the video loads
       (put images in /public/images/)
     - These autoplay muted + looped the moment they scroll into view
       using the browser's native <video> tag - no YouTube needed.

  Every card gets a small mute/unmute button in the corner so visitors
  can turn sound on if they want -  it never blocks the autoplay itself.
*/

export const heroReel = {
  type: 'youtube',
  id: 'zKTwnUe73hk',
};

export const showreel = {
  type: 'youtube',
  id: 'zKTwnUe73hk',
  title: 'Full Showreel — 2026',
  tc: '00:00:00:00',
};

export const youtubeEdits = [
  {
    type: 'youtube',
    id: '4aSsdFKvoxU',
    title: 'YouTube Edit',
    tc: '00:02:14:03',
  },
  // Add more YouTube edits here, same shape as above.
];

export const shortFilms = [
  {
    type: 'youtube',
    id: 'oL9YkmADgVo',
    title: 'Short Film',
    tc: '00:07:41:02',
  },
  {
    type: 'youtube',
    id: 'vTCCyog9XEA',
    title: 'Short Film',
    tc: '00:09:12:17',
  },
  {
    type: 'youtube',
    id: '1QQR5Xg7xpw',
    title: 'Short Film',
    tc: '00:11:03:09',
  },
  // Example of a raw uploaded file instead of YouTube:
  // {
  //   type: 'local',
  //   src: '/videos/my-short-film.mp4',
  //   poster: '/images/my-short-film-poster.jpg',
  //   title: 'Untitled Short Film',
  //   tc: '00:13:00:00',
  // },
];
