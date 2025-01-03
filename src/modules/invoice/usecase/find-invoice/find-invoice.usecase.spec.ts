import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoiceItems.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const item1 = new InvoiceItems({
  id: new Id("1"),
  name: "Item 1",
  price: 100,
});
const item2 = new InvoiceItems({
  id: new Id("2"),
  name: "Item 2",
  price: 200,
});
const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "0000-0000",
  address: new Address(
    "Street 000",
    "00",
    "West Palm Beach",
    "Miami",
    "FL",
    "00000-000"
  ),
  items: [item1, item2],
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice use case unit test", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = { id: "1" };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.address).toEqual(invoice.address);
    expect(result.document).toEqual(invoice.document);
    expect(result.total).toEqual(invoice.total);
    expect(result.createdAt).toEqual(invoice.createdAt);
    expect(result.updatedAt).toEqual(invoice.updatedAt);
    expect(result.items.length).toBe(2);
    result.items.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
      expect(item.price).toBeDefined();
    });
  });
});
