import axios from "axios";

describe("test", () => {
  it("hello world", async () => {
    const { data } = await axios.get("http://localhost:3000");
    expect(data).toEqual("ok");
  });
});
