import typeorm from "./database/database-connection";
import app from "./config/app";
import { RedisConnection } from "./database/redis.connection";

typeorm
  .initialize()
  .then(() => {
    RedisConnection.connect();
    app.listen(8080, () => console.log("Api running on http://localhost:8080"));
  })
  .catch((err: any) => {
    console.error(err);
  });
