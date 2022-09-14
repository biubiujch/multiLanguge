import axios from "axios";

describe("projectTest", () => {
  it("getAll", async () => {
    const res = await axios.post("http://localhost:3000/api/project/create", {}, {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwidXNlck5hbWUiOiJhZG1pbiIsImlhdCI6MTY2MzE1NTA2MiwiZXhwIjoxNjYzMjQxNDYyfQ.l4a5280zsSB2J3eejhxnuIQ2C0WxAV9byr844cnImcQ"
      },
      data: {}
    });
    console.log(res)
  });
});