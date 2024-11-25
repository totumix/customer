import { OrdersRouter } from "./src/modules/client/router";
import express from 'express'
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/api', OrdersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
