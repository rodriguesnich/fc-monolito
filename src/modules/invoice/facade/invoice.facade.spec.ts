import { Sequelize } from "sequelize-typescript"
import {InvoiceModel} from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemsModel } from "../repository/invoiceItems.model";


const genericInput = {
  name: "Company XYZ",
  document: "0000-0000",
  street: "Street 000",
  number: "00",
  complement: "West Palm Beach",
  city: "Miami",
  state: "FL",
  zipCode: "00000-000",
  items: [
    {
      id: "1",
      name: "Item 1",
      price: 100
    },
    {
      id: "2",
      name: "Item 2",
      price: 200
    },
  ]
};

describe("Invoice Facade test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([InvoiceModel, InvoiceItemsModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    
    const generated = await facade.generate(genericInput);
    const invoice = await facade.find({ id: generated.id });

    expect(invoice.id).toEqual(generated.id)
    expect(invoice.name).toEqual(genericInput.name)
    expect(invoice.document).toEqual(genericInput.document)
    expect(invoice.address.street).toEqual(genericInput.street)
    expect(invoice.address.number).toEqual(genericInput.number)
    expect(invoice.address.complement).toEqual(genericInput.complement)
    expect(invoice.address.city).toEqual(genericInput.city)
    expect(invoice.address.state).toEqual(genericInput.state)
    expect(invoice.address.zipCode).toEqual(genericInput.zipCode)
    expect(invoice.total).toEqual(300)
    expect(invoice.items.length).toBe(2)

    invoice.items.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.price).toBeDefined()
    })
  })

  it("should generate an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
   
    const invoice = await facade.generate(genericInput);

    expect(invoice.id).toBeDefined();
    expect(invoice.name).toEqual(genericInput.name);
    expect(invoice.document).toEqual(genericInput.document);
    expect(invoice.street).toEqual(genericInput.street);
    expect(invoice.number).toEqual(genericInput.number);
    expect(invoice.complement).toEqual(genericInput.complement);
    expect(invoice.city).toEqual(genericInput.city);
    expect(invoice.state).toEqual(genericInput.state);
    expect(invoice.zipCode).toEqual(genericInput.zipCode);
    expect(invoice.total).toEqual(300);
    expect(invoice.items.length).toBe(2);

    invoice.items.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.price).toBeDefined()
    })
  })
})