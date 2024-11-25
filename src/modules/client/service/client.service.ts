import moment from "moment";
import fs from "fs";
import { IClientServiceInterface } from "./client.interface";
import customers from '../../../datajson/customer.json';
import { generateJWT } from "../../../configs/jwt";

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

    async createJwtCustomerToken(customer: any) {
        const customerMatch = this.getCustomerByEmail(customer.email)
        if (!customerMatch) {
            throw new Error('Cliente no encontrado');
        }
        const token = generateJWT(customer);
        return token;
    }

    calculateAge(email: string): number {
        const customer = this.getCustomerByEmail(email);
        if (customer) {
            const birthDate = moment(customer.dateOfBirth);
            return moment().diff(birthDate, 'years');
        }
        throw new Error('Cliente no encontrado');
    }

    getCustomerByEmail(email: string) {
        const customer = customers.find(c => c.email === email);
        if (!customer) {
            throw new Error('Cliente no encontrado');
        }
        return customer;
    }

}



