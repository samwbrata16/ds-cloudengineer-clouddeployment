const request = require("supertest");
const express = require("express");
const loremIpsum = require("lorem-ipsum").loremIpsum;

const app = express();
app.use(express.json());
app.post("/api/generate", (req, res) => {
  const { paragraphs = 3 } = req.body;
  const text = loremIpsum({ count: parseInt(paragraphs), units: "paragraphs", format: "plain" });
  res.json({ text });
});


describe("POST /api/generate", () => {
  it("should return lorem ipsum text", async () => {
    const res = await request(app).post("/api/generate").send({ paragraphs: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBeDefined();
    expect(typeof res.body.text).toBe("string");
  });
});

describe("GET /health", () => {
  it("should return OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });
});
