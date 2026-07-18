Put your own raw video files (.mp4) in this folder.

Then reference them in src/data/videos.js like this:

{
  type: 'local',
  src: '/videos/your-file-name.mp4',
  poster: '/images/your-thumbnail.jpg',
  title: 'My Short Film',
  tc: '00:13:00:00',
}

Keep each file under ~15-20MB if possible (compress with Handbrake or
similar) so the site loads fast, especially on mobile data.
