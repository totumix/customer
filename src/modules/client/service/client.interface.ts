export interface IClientServiceInterface {
    saveCustomer(data: any): any;
    getCustomersAlphabetically(): any;
    getCustomersByAge(): any;
    getCustomerStats(): any;
    createJwtCustomerToken(customer): any;
}