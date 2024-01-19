import request from "supertest";
import mongoose from "mongoose";
import { app } from "../src/app";
import config from "../src/config";

beforeEach(async () => {
  await mongoose.connect(config.DB.TEST_URL);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                    BEGIN                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */

describe("Begin", () => {
  it("main route is connected", async () => {
    const res = await request(app).get("/");

    expect(res.body["result"]).toBe("Connected");
  });
});

/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 ADD TICKET                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */

describe("Add ticket", () => {
  it("without auth token", async () => {
    const res = await request(app).post("/donate");
    expect(res.statusCode).toBe(401);
    expect(res.body["result"]).toBeNull();
    expect(res.body["error"]).toBeTruthy();
  });

  it("with valid auth token", async () => {
    const res = await request(app)
      .post("/donate")
      .auth(config.AUTH, { type: "bearer" })
      .send({
        name: "John Doe",
        item: "Material",
        phoneNumber: "01234567891",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body["error"]).toBeNull();
    expect(res.body["result"]).toBeTruthy();
  });

  it("without name", async () => {
    const res = await request(app)
      .post("/donate")
      .auth(config.AUTH, { type: "bearer" })
      .send({
        item: "Item",
        phoneNumber: "01234567891",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body["result"]).toBeNull();
    expect(res.body["error"]).toBeTruthy();
  });

  it("without item", async () => {
    const res = await request(app)
      .post("/donate")
      .auth(config.AUTH, { type: "bearer" })
      .send({
        name: "John Doe",
        phoneNumber: "01234567891",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body["result"]).toBeNull();
    expect(res.body["error"]).toBeTruthy();
  });

  it("without phone number", async () => {
    const res = await request(app)
      .post("/donate")
      .auth(config.AUTH, { type: "bearer" })
      .send({
        name: "John Doe",
        item: "Item",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body["result"]).toBeNull();
    expect(res.body["error"]).toBeTruthy();
  });
});

/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 GET PUBLIC                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */

describe("Get public", () => {
  it("get public html", async () => {
    const res = await request(app)
      .get("/public")
      .auth(config.AUTH, { type: "bearer" });

    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toContain("text/html");
  });
});

/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                   GET PDF                                  */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                      -                                     */
/* -------------------------------------------------------------------------- */
describe("Get pdf", () => {
  // This route takes about 25 seconds to generate the pdf
  it("get pdf file", async () => {
    const res = await request(app)
      .get("/donate/pdf")
      .auth(config.AUTH, { type: "bearer" });

    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toContain("application/pdf");
  }, 30000);
});
