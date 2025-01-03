import {app} from "../../express";
import request from "supertest";
import {Sequelize} from 'sequelize-typescript';
import {InvoiceModel} from '../../../modules/invoice/repository/invoice.model';
import { InvoiceItemsModel } from "../../../modules/invoice/repository/invoiceItems.model";

describe("E2E/API tests for invoice", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true},
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);

    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should creates and gets an invoice", async () => {
    const invoiceCreated = await request(app)
      .post("/invoice")
      .send({
        name: "Invoice 1",
        document: "987654321",
        street: "Rua",
        number: "271",
        complement: "complemento",
        city: "Colatina",
        state: "ES",
        zipCode: "29705710",
        items: [
          {
            id: "1",
            name: "Product 1",
            price: 10
          },
          {
            id: "2",
            name: "Product 2",
            price: 20
          }
        ]
      });

    expect(invoiceCreated.status).toBe(200);

    expect(invoiceCreated.body.name).toBe("Invoice 1");
    expect(invoiceCreated.body.document).toBe("987654321");
    expect(invoiceCreated.body.items[0].name).toBe("Product 1");
    expect(invoiceCreated.body.items[0].price).toBe(10);
    expect(invoiceCreated.body.items[1].name).toBe("Product 2");
    expect(invoiceCreated.body.items[1].price).toBe(20);
    expect(invoiceCreated.body.street).toBe("Rua")
    expect(invoiceCreated.body.number).toBe("271")
    expect(invoiceCreated.body.complement).toBe("complemento")
    expect(invoiceCreated.body.city).toBe("Colatina")
    expect(invoiceCreated.body.state).toBe("ES")
    expect(invoiceCreated.body.zipCode).toBe("29705710")

    const response = await request(app).get(`/invoice/${invoiceCreated.body.id}`)
    expect(response.status).toBe(200);
  });
});