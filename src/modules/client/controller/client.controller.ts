import { Request, Response, Router } from "express";
import { IClientDomainInterface } from "../domain/client.interface";
import { ClientDomain } from "../domain/client.domain";

export const ClientController = Router();

ClientController.post('/customers', async (req, res) => {
    try {
        let options: any = req.body;
        let clientDomain: IClientDomainInterface = new ClientDomain();
        let response: any = await clientDomain.saveCustomer(options);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
        res.status(500).json({ error: 'Error al guardar el cliente' });
    }
});

ClientController.get('/customers/alphabetically', async (req, res) => {
    try {
        let clientDomain: IClientDomainInterface = new ClientDomain();
        const customers = await clientDomain.getCustomersAlphabetically();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error al obtener los clientes alfabéticamente:', error);
        res.status(500).json({ error: 'Error al obtener los clientes alfabéticamente' });
    }
});

ClientController.get('/customers/by-age', async (req, res) => {
    try {
        let clientDomain: IClientDomainInterface = new ClientDomain();
        const customers = await clientDomain.getCustomersByAge();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error al obtener los clientes por edad:', error);
        res.status(500).json({ error: 'Error al obtener los clientes por edad' });
    }
});

ClientController.get('/customers/stats', async (req, res) => {
    try {
        let clientDomain: IClientDomainInterface = new ClientDomain();
        const stats = await clientDomain.getCustomerStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error al obtener las estadísticas de los clientes:', error);
        res.status(500).json({ error: 'Error al obtener las estadísticas de los clientes' });
    }
});


ClientController.post('/customers/jwt', async (req, res) => {
    const { fullName, email } = req.body;
    let clientDomain: IClientDomainInterface = new ClientDomain();
    try {
        const token = await clientDomain.createJwtCustomerToken({ fullName, email });
        res.status(200).json({ token });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

});

ClientController.get('/customers/age/:email', async (req, res) => {
    let clientDomain: IClientDomainInterface = new ClientDomain();
    try {
        const age = await clientDomain.calculateAge(req.params.email);
        res.status(200).json({ age });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

