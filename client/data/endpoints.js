const base = 'https://api.instagram.com/v1';
import { instagramToken } from './config';

export function commentEndpoint(id) {
  return `${base}/media/${id}/comments?access_token=${instagramToken}`;
}

export function mediaEndpoint(userId = 519208) {
  return `${base}/users/${userId}/media/recent?access_token=${instagramToken}`;
}

