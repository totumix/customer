import jwt from 'jsonwebtoken';

const SECRET_KEY = "ejercicioentrevista";

interface Customer {
    fullName: string;
    email: string;
}

function generateJWT(customer: Customer): string {
    const token = jwt.sign(
        {
            name: customer.fullName,
            email: customer.email,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
    
    return token;
}

export { generateJWT, Customer };
