export const heroReel = {
  type: 'youtube',
  id: 'zKTwnUe73hk',
};

// The standalone showreel — shown once, simply, at the top of Work.jsx.
// Not part of a layered scroll section.
export const showreel = {
  type: 'youtube',
  id: 'zKTwnUe73hk',
  title: 'Full Showreel — 2026',
  tc: '00:00:00:00',
};

// YouTube edits — its own layered-card scroll section in Work.jsx.
// Give each one a category so the right badge shows on its card.
export const youtubeEdits = [
  {
    type: 'youtube',
    id: '4aSsdFKvoxU',
    title: 'YouTube Edit',
    category: 'Faceless', // change to 'Faceless' / 'SaaS Animation' / 'Commentary'
    tc: '00:02:14:03',
  },
  {
    type: 'youtube',
    id: 'GXFqbxZAE2A',
    title: ' Saas Ad',
    category: 'SaaS Animation',
    tc: '00:04:30:00',
  },
  {
    type: 'youtube',
    id: 'ccxGf6eQNxM',
    title: 'Commentary Edit',
    category: 'Commentary',
    tc: '00:06:10:00',
  },
];

// Short films — a second, separate layered-card scroll section.
export const shortFilms = [
  {
    type: 'youtube',
    id: 'oL9YkmADgVo',
    title: 'Short Film',
    category: 'Short Film',
    tc: '00:07:41:02',
  },
  {
    type: 'youtube',
    id: 'vTCCyog9XEA',
    title: 'Short Film',
    category: 'Short Film',
    tc: '00:09:12:17',
  },
  {
    type: 'youtube',
    id: '1QQR5Xg7xpw',
    title: 'Short Film',
    category: 'Short Film',
    tc: '00:11:03:09',
  },
  {
    type: 'youtube',
    id: 'XE9j3CS6pg0',
    title: 'Short Film',
    category: 'Short Film',
    tc: '00:13:27:14',
  },
  // Example of a raw uploaded file instead of YouTube:
  // {
  //   type: 'local',
  //   src: '/videos/my-short-film.mp4',
  //   poster: '/images/my-short-film-poster.jpg',
  //   title: 'Untitled Short Film',
  //   category: 'Short Film',
  //   tc: '00:13:00:00',
  // },
];