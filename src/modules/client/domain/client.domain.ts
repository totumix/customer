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

    async getCustomerStats() : Promise<any> {
        let clientService: IClientServiceInterface = new ClientService()
        const stats = clientService.getCustomerStats();
        return stats;
    }

    async createJwtCustomerToken(customer) : Promise<any> {
        let clientService: IClientServiceInterface = new ClientService()
        const token = clientService.createJwtCustomerToken(customer);
        return token;
    }

    async calculateAge(email) : Promise<any> {
        let clientService: IClientServiceInterface = new ClientService()
        const age = clientService.calculateAge(email);
        return age;
    }
}

