import cors from 'cors';
import express, { Express } from "express"

export default (app: Express) => {
    app.use(cors());
    app.use(express.json());
}