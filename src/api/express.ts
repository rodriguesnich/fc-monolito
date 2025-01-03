import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import ProductModel from "../modules/checkout/repository/product.model";
import OrderModel from "../modules/checkout/repository/order.model";
import OrderClientModel from "../modules/checkout/repository/client.model";
import ClientModel from "../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { ProductModel as AdmProductModel } from "../modules/product-adm/repository/product.model";
import StoreProductModel from "../modules/store-catalog/repository/product.model";
import { InvoiceItemsModel } from "../modules/invoice/repository/invoiceItems.model";
import { CheckoutRoutes } from "./routes/checkout/checkout-route";
import { ClientRoutes } from "./routes/clients/clients-route";
import { InvoiceRoutes } from "./routes/invoices/invoices.route";
import { ProductRoutes } from "./routes/products/products-route";

export const app: Express = express();
app.use(express.json());
app.use("/products", ProductRoutes);
app.use("/clients", ClientRoutes);
app.use("/checkout", CheckoutRoutes);
app.use("/invoice", InvoiceRoutes);

export let sequelize: Sequelize;

async function configureDatabase() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([
    OrderModel,
    ClientModel,
    OrderClientModel,
    TransactionModel,
    StoreProductModel,
    InvoiceItemsModel,
    InvoiceModel,
    ProductModel,
    AdmProductModel,
  ]);
  await sequelize.sync();
}

configureDatabase();