import express from 'express';
import router from './routers/routes.js';
import cors from 'cors';
import PedidoController from './controllers/PedidoController.js';

const app = express();


const corsOptions = {
    origin: [`http://127.0.0.1:5500`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);
app.get('/search',PedidoController.search)

const port = "3000";

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});

export default app