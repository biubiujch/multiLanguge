import axios from "axios";

describe("projectTest", () => {
  it("getAll", async () => {
    const res = await axios.get("http://localhost:3000/api/project/getAll");
    console.log(res)
  });
});