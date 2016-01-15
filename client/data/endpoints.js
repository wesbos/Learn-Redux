const base = 'https://crossorigin.me/https://www.instagram.com';
import { instagramToken } from './config';

export function commentEndpoint(code) {
  return `${base}/p/${code}/?__a=1`;
}

export function mediaEndpoint(user = 'wesbos') {
  return `${base}/${user}/?__a=1`;
}

