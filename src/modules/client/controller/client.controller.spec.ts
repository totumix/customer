import request from 'supertest';
import express from 'express';
import { ClientController } from './client.controller'; // Ajusta la ruta
import { ClientDomain } from '../domain';

jest.mock('../domain/client.domain'); // Mocks de ClientDomain

// Configura tu aplicación de Express
const app = express();
app.use(express.json());
app.use(ClientController);

describe('ClientController', () => {
    describe('POST /customers/jwt', () => {
        it('should return a JWT token for a valid customer', async () => {
            // Simula la respuesta de createJwtCustomerToken
            ClientDomain.prototype.createJwtCustomerToken = jest.fn().mockResolvedValue('mocked_jwt_token');

            const response = await request(app)
                .post('/customers/jwt')
                .send({ fullName: 'John Doe', email: 'john.doe@example.com' });

            expect(response.status).toBe(200);
            expect(response.body.token).toBe('mocked_jwt_token');
        });

        it('should return an error if customer creation fails', async () => {
            // Simula un error
            ClientDomain.prototype.createJwtCustomerToken = jest.fn().mockRejectedValue(new Error('Creation failed'));

            const response = await request(app)
                .post('/customers/jwt')
                .send({ fullName: 'John Doe', email: 'john.doe@example.com' });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Creation failed');
        });
    });

    describe('GET /customers/age/:email', () => {
        it('should return the correct age for the given email', async () => {
            // Simula la respuesta de calculateAge
            ClientDomain.prototype.calculateAge = jest.fn().mockResolvedValue(30);

            const response = await request(app)
                .get('/customers/age/john.doe@example.com');

            expect(response.status).toBe(200);
            expect(response.body.age).toBe(30);
        });

        it('should return an error if age calculation fails', async () => {
            // Simula un error
            ClientDomain.prototype.calculateAge = jest.fn().mockRejectedValue(new Error('Age calculation failed'));

            const response = await request(app)
                .get('/customers/age/john.doe@example.com');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Age calculation failed');
        });
    });
});
