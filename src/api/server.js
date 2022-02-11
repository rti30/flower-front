
const api = 'https://flower-back.herokuapp.com/api';
import statusMessege from '@/api/statusMessege.js'
import refresh from '@/api/refresh.js'

const interceptor = {
	response: (async (response, ignore = false) => {
		if (ignore) { return response }
		const { ok, status } = response;
		const body = await response.json();
		const serverMessege = statusMessege({ status })

		return { ok, body, status, serverMessege }
	}),
	noOk: (async (response, options = {}, url, ignore = false) => {
		// Поппытка рефреша
		if (ignore) { return response }
		if (response.status === 401) {
			console.log(401);
			const { ok, body, status, serverMessege } = await refresh(url, options, this.connect);
			// return { ok, body, status, serverMessege };
			console.log('Рефреш!!!!!!!!!!!!!!!!!! response', { ok, body, status, serverMessege });
			if (!ok) {
				console.log('рефреш не ок');
				//	logout(store);
			}
			return { ok, body, status, serverMessege };
		}
		else if (response.status === 403) {
			if (ignore) { return response }
			//	logout(store);
			const { ok, body, status } = response;
			const serverMessege = statusMessege({ status })
			return { ok, body, status, serverMessege };
		}
		else {
			const { ok, status } = response;
			const body = await response.json();
			const serverMessege = statusMessege({ status })
			return { ok, body, status, serverMessege }
		}
	}),
	error: (async ({ ok, body, status }) => {
		const serverMessege = statusMessege({ status })
		return { ok, body, status, serverMessege };
	})
};
export default {
	connect: async (url, options = {}, ignore = false) => {
		try {
			console.log({ url, options });
			console.log('full url:', api + url);
			const response = await fetch(api + url, options);
			if (response.ok) {
				const { ok, status, body, serverMessege } = await interceptor.response(response, ignore);
				return { ok, body, status, serverMessege };
			}
			else if (response.ok === false) {

				console.log("server не ок");
				const { ok, status, body, serverMessege } = await interceptor.noOk(response, options, url, ignore)
				return { ok, body, status, serverMessege };
			}

			// return { ok: response.ok, body: await response.json(), status: response.status, serverMessege };
		}

		catch (e) {
			console.log("Зашли?");
			console.log('!!!!!!!!!!!!!!!!!!!!', e);
			const { serverMessege } = await interceptor.error({ ok: false, body: e, status: 'NoConnect' });
			return { ok: false, body: e, status: 'NoConnect', serverMessege };
		}
	},
	interceptor,

}


