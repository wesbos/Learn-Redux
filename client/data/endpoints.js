const base = 'https://api.instagram.com/v1';
const accessToken = '519208.e1ed559.84ef4e75730249e48731701c3d89fa29';

export function commentEndpoint(id) {
  return `${base}/media/${id}/comments?access_token=${accessToken}&callback=lol`;
}

export function mediaEndpoint(userId = 519208) {
  return `${base}/users/${userId}/media/recent?access_token=${accessToken}&callback=lol`;
}

