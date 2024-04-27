import Cookies from 'universal-cookie';
import { tokenExpiryTime } from './otp';

type ICookie = {
  key: string;
  value: string;
};

export default function storeCookies(cookies: ICookie[]) {
  const cookieStore = new Cookies();

  cookies.forEach((cookie) => {
    cookieStore.remove(cookie.key);
    cookieStore.set(cookie.key, cookie.value, {
      path: '/',
      expires: tokenExpiryTime,
    });
  });
}
