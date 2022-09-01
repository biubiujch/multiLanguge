import axios from "axios";

describe("administrator", () => {
  it("login", async () => {
    const res = await axios.post("http://localhost:3000/api/administrator/login", {
      params: { name: "admin222", password: "111" },
    });
    console.log(res);
  });
});
