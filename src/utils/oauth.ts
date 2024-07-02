//kakao
const REST_API_KEY = 'aabb7108871c3e28e5bdf175209583fd';
const KAKAO_REDIRECT_URL = 'http://localhost:5173/oauth/kakao';
// const REDIRECT_URL = 'https://d1xcphd0q4kb63.cloudfront.net/oauth/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}`;

//google
const GOOGLE_CLIENT_ID = '147058666069-ra2hv6ck0mb57pbq0q36dso4gl2jught.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URL = 'http://localhost:5173/oauth/google';
// const REDIRECT_URL = 'https://d1xcphd0q4kb63.cloudfront.net/oauth/google';

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}`;
