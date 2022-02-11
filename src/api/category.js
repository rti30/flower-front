const url = "/category";

export default server => ({
   async getAll() {
      console.log("Api Получение категорий");
      const { ok, body, status, serverMessege } = await server(url);
      return { ok, body, status, serverMessege }
   },
})
