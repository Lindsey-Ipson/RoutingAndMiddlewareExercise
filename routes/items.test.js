process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const Item = require("../item");

let test_item = { name: "test_item", price: 1.99 };


beforeEach( async () => {
  await request(app).post(`/items`).send({name: "test_item", price: 1.99
      });
});


afterEach( async () => {
  const resp = await request(app).get('/items');
  const { items } = resp.body;
  const items_to_delete = items.map(item => item.name);

  items_to_delete.forEach( async (item) => {
    await request(app).delete(`/items/${item}`);
  })

});


describe("GET /items", function () {
  test("Gets the full list of items", async function () {
    const resp = await request(app).get('/items');
    const { items } = resp.body;
    expect(resp.statusCode).toBe(200);
    expect(items).toHaveLength(1);
    expect(items).toContainEqual(test_item);
  });
});


describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${test_item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item).toEqual(test_item);
  });

  test("Responds with 404 if item not found", async function () {
    const resp = await request(app).get("/items/999");
    expect(resp.statusCode).toBe(404);
  });
});


describe("POST /items", function () {
  test("Creates a new item and returns that item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "test_item_2",
        price: 2.99
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.added_item.name).toEqual("test_item_2");
    expect(resp.body.added_item.price).toEqual(2.99);
  });
});


describe("PATCH /items/:name", function () {
  test("Updates an item", async function () {
    const resp = await request(app)
      .patch(`/items/${test_item.name}`)
      .send({
        name: "test_item_updated"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.updated_item).toEqual({
      name: "test_item_updated"
    });
  });

  test("Responds with 404 if item not found", async function () {
    const resp = await request(app).patch("/items/999");
    expect(resp.statusCode).toBe(404);
  });
});


describe("DELETE /items/:name", function () {
  test("Deletes an item", async function () {

    const resp = await request(app).delete(`/items/${test_item.name}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted item with name test_item" });
  });
});



