const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

const expect = chai.expect;

// configure chai to use chai-http to make api request
chai.use(chaiHttp);

// Test Cases
describe("Youtube Scbscribers API testing", () => {
  // Test 1
  it("Should return all subscribers", async () => {
    const res = await chai.request(app).get("/subscribers");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  // Test 2
  it("Should return names and subscribed channels of all subscribers", async () => {
    const res = await chai.request(app).get("/subscribers/names");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
  });

  // Test 3
  it("Should return information about specific subscriber by its id", async () => {
    const id = "65f06b0b36c52ae0098eb034";
    const res = await chai.request(app).get(`/subscribers/${id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
  });

  // Test 4
  it("should return 404 for any route that is not found", async () => {
    const res = await chai.request(app).get("/anyOtherRoute");
    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message", "Route Not Found");
  });
});
