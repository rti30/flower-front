/* const baseUrl = "/order";
import fingerPrint2 from '@/api/fingerPrint.js'
import { setTokens, cleanTokensData, getJWTPayload, getAccessToken, getUserId } from '@/api/token.js';


export default server => ({
	async getOrder() {
		console.log("Загрузка истории заказрв");
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



})


 */