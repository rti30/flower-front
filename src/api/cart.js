const baseUrl = "/cart";
import fingerPrint2 from '@/api/fingerPrint.js'
import { getAccessToken } from '@/api/token.js';


export default server => ({
	async load() {
		console.log("Загрузка корзины с сервера");
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
		console.log("Добавление в корзину на сервер");
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
		console.log("Удаление в корзину на сервер");
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

	async change(productId, newCount) {
		console.log("Изменение кол-ва товаров в корзине на сервере");
		const fingerPrint = (await fingerPrint2).deviceId;
		const token = getAccessToken();
		const url = baseUrl;
		const options = {
			method: "PUT",
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fingerPrint, productId, newCount }),
		}

		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},

	async getPromoValue(productId, promo) {
		console.log("Запрос на проверку промокода", productId, promo);

		const url = '/promo/check';
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productId, promo }),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},

	async checkOrder(order) {
		console.log("Запрос офрмление оплаты", order);

		const url = baseUrl + '/check';
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},
	async buy(orderId) {
		console.log("Покупка", orderId);
		const url = '/order';
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ reservation: orderId }),
		}
		const { ok, body, status, serverMessege } = await server(url, options);
		return { ok, body, status, serverMessege }
	},

})


