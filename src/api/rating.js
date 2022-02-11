const baseUrl = "/rating";
import fingerPrint2 from '@/api/fingerPrint.js'
import { getAccessToken } from '@/api/token.js';


export default server => ({

    async getCount(productId) {
        console.log("Загрузка колчества оценок товара с сервера");
        const url = `/?id=${productId}`
        const { ok, body, status, serverMessege } = await server(baseUrl + url);
        return { ok, body, status, serverMessege }
    },

    async getMark(productId) {
        console.log("Загрузка оценки товара пользователем с сервера");
        const url = baseUrl + '/get';
        const fingerPrint = (await fingerPrint2).deviceId;
        const token = getAccessToken();
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

    async add(productId, mark) {
        console.log("Добавление оценки тавара пользователем на сервер");
        const fingerPrint = (await fingerPrint2).deviceId;
        const token = getAccessToken();
        const url = baseUrl;
        const options = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fingerPrint, productId, mark }),
        }

        const { ok, body, status, serverMessege } = await server(url, options);
        return { ok, body, status, serverMessege }
    },
})
