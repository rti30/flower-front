const baseUrl = "/like";
import fingerPrint2 from '@/api/fingerPrint.js'
import { getAccessToken } from '@/api/token.js';


export default server => ({
	async load() {
		console.log("Загрузка избранных товаров с сервера");
		const url = baseUrl + '/get';
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
		return { ok, body, status, serverMessege }
	},
	async add(productId) {
		console.log("Добавление избаррного тавара на сервер");
		const fingerPrint = (await fingerPrint2).deviceId;
		const token = getAccessToken();
		const url = baseUrl;
		const options = {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint, productId }),
		}

		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},
	async remove(productId) {
		console.log("Удаление избаррного тавара на сервер");
		const fingerPrint = (await fingerPrint2).deviceId;
		const token = getAccessToken();
		const url = baseUrl;
		const options = {
			method: "DELETE",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint, productId }),
		}

		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},
})

