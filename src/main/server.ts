import app from "./config/app";
import typeorm from "./database/database-connection";

typeorm
  .initialize()
  .then(() => {
    app.listen(8080, () => console.log("Api running on http://localhost:8080"));
  })
  .catch((err: any) => {
    console.error(err);
  });
