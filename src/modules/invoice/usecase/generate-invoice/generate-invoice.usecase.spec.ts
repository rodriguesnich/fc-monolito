import GenerateInvoiceUseCase from "./generate-invoice.usecase";


const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
};

describe("Generate Invoice use case unit test", () => {

  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
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

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.total).toEqual(300);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items.length).toBe(2);
    result.items.forEach(item => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.price).toBeDefined()
    });
  })
})