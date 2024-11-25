
export interface IClientDomainInterface {
    saveCustomer(data: any): Promise<any>;
    getCustomersAlphabetically(): Promise<any>;
    getCustomersByAge(): Promise<any>;
}