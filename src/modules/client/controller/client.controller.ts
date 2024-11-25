import { Request, Response, Router } from "express";
import { IClientDomainInterface } from "../domain/client.interface";
import { ClientDomain } from "../domain/client.domain";

export const ClientController = Router();


ClientController.post('/customers', async (req, res) => {
    let options: any = req.body;
    let clientDomain: IClientDomainInterface = new ClientDomain();
    let response: any = await clientDomain.saveCustomer(options);
    res.status(201).json(response);
});

ClientController.get('/customers/alphabetically', async (req, res) => {
    let clientDomain: IClientDomainInterface = new ClientDomain();
    const customers = await clientDomain.getCustomersAlphabetically();
    res.json(customers);
});

