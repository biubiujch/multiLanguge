import axios from "axios";

// describe("translate", () => {
//   it("create", async () => {
//     const res = await axios.post("http://localhost:3000/api/translate/create", {}, {
//       params: {
//         key: "test",
//         from: "zh",
//         to: "en",
//         content: "测试",
//         projectID: "1",
//       }
//     });
//     console.log(res, "return data");
//   });
// });

describe("translate", () => {
  it("create", async () => {
    const res = await axios.get("http://localhost:3000/api/translate/getAll", {
      params: {
        projectID: "1",
      }
    });
    console.log(res, "return data");
  });
});