import express from "express";
import { ClientController } from "./controller/client.controller";

export const OrdersRouter = express.Router();

OrdersRouter.use(ClientController);