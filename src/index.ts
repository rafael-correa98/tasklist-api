import express from 'express';
import appRoutes from './routes'

const app = express();

app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
appRoutes(app)

app.listen(3333, () => console.log("Servidor iniciado"));

