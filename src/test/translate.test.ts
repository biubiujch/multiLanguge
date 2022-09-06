import axios from "axios";

describe("translate", () => {
  it("add", async () => {
    const res = await axios.post("http://localhost:3000/api/translate/add", {
      params: {
        key: "test",
        from: "zh",
        content: "测试",
        projectID: "1",
      },
    });
    console.log(res);
  });
});
