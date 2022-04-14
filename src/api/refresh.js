let refreshPromise = null;
import fingerPrint2 from '@/api/fingerPrint.js'
import { setTokens, getJWTPayload, } from '@/api/token.js';

export default async function refresh(url, options = {}, server, store) {
   if (refreshPromise === null) {
      const fingerPrint = (await fingerPrint2).deviceId;
      refreshPromise = server('/user/refreshToken', {
         credentials: "include",
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({ fingerPrint }),
      });
   }

   const { ok, body, serverMessege } = await refreshPromise;
   setTimeout(() => { refreshPromise = null }, 10000); //! костыль для редких ситуаций, которые не ломают авторизацию, но делают одно лишний запрос на refresh

   if (ok) {
      console.log('refresh ok', body);
      setTokens(body.accessToken);
      const payload = (ok) ? getJWTPayload(body.accessToken) : null;
      store.dispatch('user/changeUser', payload)
      options.headers.Authorization = `Bearer ${body.accessToken}`
      return server(url, options);
   }
   else {
      return { ok, body, status: 403, serverMessege };
   }

}
