import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type Props = {
    id?: Id; // criada automaticamente
    name: string;
    price: number;
}

export default class InvoiceItems extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(props: Props) {
        super(props.id);
        this.name = props.name;
        this.price = props.price;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        if (value < 0) throw new Error("Price can't be negative");
        this._price = value;
    }
};

