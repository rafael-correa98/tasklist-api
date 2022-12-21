import path from "node:path";
import { DataSourceOptions } from "typeorm";
import envsConfig from "../env/envs-config";

const entities = path.join(
    __dirname,
    "..",
    "..",
    "app",
    "shared",
    "database",
    "entities",
    "*.ts"
  );
  
  const migrations = path.join(__dirname, "..", "database", "migrations", "*.ts");
  
  export const configTypeorm: DataSourceOptions = {
    type: "postgres",
    url: envsConfig.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [entities],
    migrations: [migrations],
    ssl: {
      rejectUnauthorized: false,
    },
  };