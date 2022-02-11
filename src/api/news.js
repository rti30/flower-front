
const url = "/news";

export default server => ({
   async getAll() {
      console.log(server);
      const { ok, body, status, serverMessege } = await server(url);
      return { ok, body, status, serverMessege }
   },
})