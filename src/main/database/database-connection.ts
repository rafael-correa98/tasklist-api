import { DataSource } from "typeorm";
import { configTypeorm } from "../config/typeorm-config";

export default new DataSource(configTypeorm);