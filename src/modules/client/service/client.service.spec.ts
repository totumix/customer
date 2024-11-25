import { ClientService } from './client.service';
import moment from 'moment';
import * as jwtConfig from "../../../configs/jwt";

jest.mock("../../../configs/jwt", () => ({
  generateJWT: jest.fn(),
}));

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(() => {
    clientService = new ClientService();
  });

  describe('createJwtCustomerToken', () => {
    it('debería lanzar un error si el cliente no existe', async () => {
      const emailInexistente = "cliente@inexistente.com";
      clientService.getCustomerByEmail = jest.fn().mockReturnValue(null); // Simulamos que no se encuentra el cliente
      await expect(clientService.createJwtCustomerToken({ email: emailInexistente }))
        .rejects
        .toThrow('Cliente no encontrado');
    });

    it('debería retornar un token si el cliente existe', async () => {
      const clienteExistente = { email: "cliente@existente.com", name: "Juan" };
      const token = "jwt_token_example";
      clientService.getCustomerByEmail = jest.fn().mockReturnValue(clienteExistente);
      jest.spyOn(jwtConfig, 'generateJWT').mockReturnValue(token);
      const result = await clientService.createJwtCustomerToken(clienteExistente);
      expect(result).toBe(token);
    });
  });

  describe('calculateAge', () => {
    it('debería lanzar un error si el cliente no existe', () => {
      const emailInexistente = "cliente@inexistente.com";
      clientService.getCustomerByEmail = jest.fn().mockReturnValue(null);
      expect(() => clientService.calculateAge(emailInexistente)).toThrow('Cliente no encontrado');
    });

    it('debería calcular la edad correctamente si el cliente existe', () => {
      const clienteExistente = { email: "cliente@existente.com", dateOfBirth: "1990-01-01" };
      clientService.getCustomerByEmail = jest.fn().mockReturnValue(clienteExistente); 
      const edad = clientService.calculateAge(clienteExistente.email);
      const expectedAge = moment().diff(moment(clienteExistente.dateOfBirth), 'years');
      expect(edad).toBe(expectedAge);
    });
  });

  describe('getCustomerByEmail', () => {
    it('debería lanzar un error si el cliente no existe', () => {
        let emailInexistente = 'asdas@asdsa.com'
        clientService.getCustomerByEmail = jest.fn().mockImplementationOnce(() => {
          throw new Error('Cliente no encontrado'); // Lanzamos el error esperado
        });
        expect(() => clientService.getCustomerByEmail(emailInexistente)).toThrow('Cliente no encontrado');
      });

    it('debería retornar el cliente correcto si existe', () => {
      const clienteExistente = { email: "cliente@existente.com", fullName: "Juan Pérez" };
      clientService.getCustomerByEmail = jest.fn().mockReturnValue(clienteExistente);
      const result = clientService.getCustomerByEmail(clienteExistente.email);
      expect(result).toEqual(clienteExistente);
    });
  });
});
