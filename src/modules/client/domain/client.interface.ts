
export interface IClientDomainInterface {
    saveCustomer(data: any): Promise<any>;
    getCustomersAlphabetically(): Promise<any>;
    getCustomersByAge(): Promise<any>;
    getCustomerStats(): Promise<any>;
    createJwtCustomerToken(customer): Promise<any>;
    calculateAge(email): Promise<any>;
}