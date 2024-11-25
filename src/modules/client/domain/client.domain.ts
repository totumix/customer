import { IClientServiceInterface } from "../service/client.interface";
import { ClientService } from "../service/client.service";
import { IClientDomainInterface } from "./client.interface";

export class ClientDomain implements IClientDomainInterface {

    async saveCustomer(data): Promise<any> {
        let clientService: IClientServiceInterface = new ClientService()
        const newCustomer = await clientService.saveCustomer(data);
        return newCustomer;
    };

    async getCustomersAlphabetically(): Promise<any> {
        let clientService: IClientServiceInterface = new ClientService()
        const customers = clientService.getCustomersAlphabetically();
        return customers;
    }

    async getCustomersByAge(): Promise<any> {
        let clientService: IClientServiceInterface = new ClientService()
        const customers = clientService.getCustomersByAge();
        return customers;
    }
}

