const baseUrl = "/product";
export default server => ({
	async getAll() {
		console.log('зашли product API');
		const { ok, body, status, serverMessege } = await server(baseUrl);
		return { ok, body, status, serverMessege }
	},
	async getByTagId(param) {
		const url = `/params?param=tagId&tag=${param}`
		const { ok, body, status, serverMessege } = await server(baseUrl + url);
		return { ok, body, status, serverMessege }
	},
	async getByTagName(param) {
		console.log(param);
		const url = `/params?param=tagName&tag=${param}`
		const { ok, body, status, serverMessege } = await server(baseUrl + url);
		return { ok, body, status, serverMessege }
	},
	async getByCategoryId(param) {
		const url = `/params?param=categoryId&category=${param}`
		const { ok, body, status, serverMessege } = await server(baseUrl + url);
		return { ok, body, status, serverMessege }
	},
	async getByCategoryName(param) {
		const url = `/params?param=categoryName&category=${param}`
		const { ok, body, status, serverMessege } = await server(baseUrl + url);
		return { ok, body, status, serverMessege }
	},
	async getOneProductById(param) {
		const url = `/params?param=id&id=${param}`
		const { ok, body, status, serverMessege } = await server(baseUrl + url);
		return { ok, body, status, serverMessege }
	},
	async getByName(param) {
		const url = `/params?param=name&name=${param}`
		const { ok, body, status, serverMessege } = await server(baseUrl + url);
		return { ok, body, status, serverMessege }
	},
	async getProductsById(param) {
		const url = `/arrId`
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ idArr: param }),
		}
		const { ok, body, status, serverMessege } = await server(baseUrl + url, options);
		return { ok, body, status, serverMessege }
	},
})