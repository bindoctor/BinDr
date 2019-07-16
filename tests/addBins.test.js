const request = require("supertest");
const app = require("../app");
require('./inMemoryDatabaseTestHelper');


describe("find bin type IDs", () => {
  test("find bin type IDs", () => {
    return request(app)
      .post("/api/bins")
      .send(
        "bin%5Btype%5D=Mixed&bin%5Blng%5D=-0.10032049072933091&bin%5Blat%5D=51.53245665101659"
      )
      .set("Accept", "application/x-www-form-urlencoded; charset=UTF-8")
      .expect(200, 'added');
  });
});
