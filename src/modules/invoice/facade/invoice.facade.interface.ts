import Address from "../../@shared/domain/value-object/address"

export interface GenerateInvoiceFacadeInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export interface FindInvoiceFacadeInputDto {
  id: string
}

export interface FindInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: Address
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
  createdAt: Date
  updatedAt: Date
}

export default interface InvoiceFacadeInterface {
  generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;

  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
