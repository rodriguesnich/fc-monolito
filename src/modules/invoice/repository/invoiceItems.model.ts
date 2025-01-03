import {Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {InvoiceModel} from "./invoice.model";
import {BelongsTo} from "sequelize-typescript";

@Table({
  tableName: 'invoice_item',
  timestamps: false
})
export class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoice_id: string

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  price: number

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}