import moment from "moment";
import fs from "fs";
import { IClientServiceInterface } from "./client.interface";
import customers from '../../../datajson/customer.json';

export class ClientService implements IClientServiceInterface {


    async saveCustomer(data) {
        const customer = {
            ...data,
            id: customers.length + 1,
            createdAt: moment().toISOString()
        };

        customers.push(customer);

        fs.writeFileSync('src/datajson/customer.json', JSON.stringify(customers, null, 2));
        return customer;
    }

    async getCustomersAlphabetically() {
        return [...customers].sort((a, b) => a.fullName.localeCompare(b.fullName));
    }

    async getCustomersByAge() {
        const now = moment();
        return [...customers]
            .map(customer => ({
                name: customer.fullName,
                age: now.diff(moment(customer.dateOfBirth), 'years')
            }))
            .sort((a, b) => a.age - b.age);
    }

    async getCustomerStats() {
        const now = moment();
        const totalCustomers = customers.length;
        const totalAge = customers.reduce((acc, customer) => acc + now.diff(moment(customer.dateOfBirth), 'years'), 0);
        const averageAge = totalCustomers > 0 ? (totalAge / totalCustomers) : 0;

        return {
            totalCustomers,
            averageAge
        };
    }
}



