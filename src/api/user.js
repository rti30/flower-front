const baseUrl = "/user";
import fingerPrint2 from '@/api/fingerPrint.js'
import { setTokens, cleanTokensData, getJWTPayload, getAccessToken } from '@/api/token.js';

export default server => ({

	async signUp(data) {
		data.fingerPrint = (await fingerPrint2).deviceId;
		data.deviceInfo = (await fingerPrint2).userInfo;
		//data = { ...data, ...{ fingerPrint: (await fingerPrint2).deviceId }, ...{ deviceInfo: (await fingerPrint2).userInfo } }
		const url = baseUrl + "/registration";
		const options = {
			method: "POST",
			//body: data,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		console.log('body', body);
		return { ok, body, status, serverMessege }
	},
	async signIn(data) {
		data.fingerPrint = (await fingerPrint2).deviceId;
		data.deviceInfo = (await fingerPrint2).userInfo;
		const url = baseUrl + "/login";
		const options = {
			method: "POST",
			/* mode: 'cors',*/
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		};
		const { ok, body, status, serverMessege } = await server(url, options);
		console.log('body', body);
		console.log('sign In! ответ: ', { ok, body, status, serverMessege });
		if (ok && body.accessToken) { setTokens(body.accessToken) }
		const payload = ok ? getJWTPayload(body.accessToken) : null;
		return { ok, body, payload, status, serverMessege }
	},
	async auth() {
		const token = getAccessToken();
		const url = baseUrl + "/auth";
		const fingerPrint = (await fingerPrint2).deviceId;
		const options = {
			credentials: "include",
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint }),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		console.log('body', body);
		console.log('status', status);

		console.log({ ok, body, status, serverMessege })
		const payload = (ok) ? getJWTPayload(getAccessToken()) : null;
		return { ok, body, payload, status, serverMessege }

	},
	async logout() {
		const url = baseUrl + "/logout";
		const token = getAccessToken();
		const fingerPrint = (await fingerPrint2).deviceId;
		const options = {
			credentials: "include",
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint }),
		}
		const { ok, body, status, serverMessege } = await server(url, options, true); //! Третий параметр игнорировать в интерцепторе рефреш (происходит зацикливание в интерцепторе при рефреше)
		if (ok && body) { cleanTokensData(); }
		return { ok, body, status, serverMessege }
	},
	/* 	async getAll() {
			const url = baseUrl + "/all";
			const { ok, body, status, serverMessege } = await server(url);
			console.log('body', body);
			return { ok, body, status, serverMessege }
		}, */
	async getLoginHistory() {
		const url = baseUrl + "/loginHistory";
		const token = getAccessToken();
		const fingerPrint = (await fingerPrint2).deviceId;
		const options = {
			credentials: "include",
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint }),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},

	async getLikesProducts() {
		const url = "/like/get";
		const token = getAccessToken();
		const fingerPrint = (await fingerPrint2).deviceId;
		const options = {
			credentials: "include",
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint }),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},
	async getOrders() {
		console.log("Загрузка истории заказрв");
		const url = '/order/get';
		const fingerPrint = (await fingerPrint2).deviceId;
		const token = getAccessToken();
		const options = {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint }),
		}

		const { ok, body, status, serverMessege } = await server(url, options);
		if (ok && body) {
			return { ok, body, status, serverMessege }
		}
		else {
			return false
		}
	},

});

