import dataSource from '../../../../src/main/database/database-connection'
import app from '../../../../src/main/config/app'
import { RedisConnection } from "../../../../src/main/database/redis.connection"
import supertest from 'supertest';

jest.mock("ioredis", () => require("ioredis-mock"));

describe("testa a rota POST - '/user/:userId/tasks'", () => {
    beforeAll(async () => {
        await dataSource.initialize();
        RedisConnection.connect();
      });
    
      afterAll(async () => {
        await dataSource.destroy();
        RedisConnection.destroy();
      });
    
    test("Deve dar erro por tamanho de ID ser diferente de 36", async() => {
      const response = await supertest(app).post("/user/:userId/tasks")
      
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: "Usuário não encontrado" })
    });

    test("Deve dar erro descrição obrigatória", async() => {
      const response = await supertest(app).post("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks").send({description: ""})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "O campo descrição é obrigatório"})
    });

    test("Deve dar erro detalhamento obrigatória", async() => {
      const response = await supertest(app).post("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks").send({description: "description", detail: ""})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "O campo detalhamento é obrigatório"})
    });

    test("Deve retornar 201", async() => {
      const response = await supertest(app).post("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks").send({description: "description", detail: "detail"})
      
      expect(response.status).toBe(201)
    });
})

describe("testa a rota GET - '/user/:userId/tasks'", () => {
    beforeAll(async () => {
        await dataSource.initialize();
        RedisConnection.connect();
      });
    
      afterAll(async () => {
        await dataSource.destroy();
        RedisConnection.destroy();
      });
    
    test("Deve dar erro por tamanho de ID ser diferente de 36", async() => {
      const response = await supertest(app).get("/user/:userId/tasks")
      
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: "Usuário não encontrado" })
    });

    test("Deve retornar 200", async() => {
      const response = await supertest(app).get("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks")

      expect(response.status).toBe(200)
    });

})

describe("testa a rota PUT - '/user/:userId/tasks/:id'", () => {
    beforeAll(async () => {
        await dataSource.initialize();
        RedisConnection.connect();
      });
    
      afterAll(async () => {
        await dataSource.destroy();
        RedisConnection.destroy();
      });
    
      test("Deve dar erro descrição obrigatória", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34").send({description: ""})

        expect(response.status).toBe(400)
        expect(response.body).toEqual({error: "O campo descrição é obrigatório"})
      });
  
      test("Deve dar erro detalhamento obrigatória", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34").send({description: "description", detail: ""})
        
        expect(response.status).toBe(400)
        expect(response.body).toEqual({error: "O campo detalhamento é obrigatório"})
      });

      test("Deve dar erro por tamanho de userID ser diferente de 36", async() => {
        const response = await supertest(app).put("/user/:userId/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34").send({description: "description", detail: "detail"})
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: "Usuário não encontrado" })
      });

      test("Deve dar erro por tamanho de taskID ser diferente de 36", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/:id").send({description: "description", detail: "detail"})
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: "Recado não encontrado" })
      });

      test("Deve retornar 200", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34").send({description: "description", detail: "detail"})
        
        expect(response.status).toBe(200)
      });




})

describe("testa a rota DELETE - '/user/:userId/tasks/:id'", () => {
    beforeAll(async () => {
        await dataSource.initialize();
        RedisConnection.connect();
      });
    
      afterAll(async () => {
        await dataSource.destroy();
        RedisConnection.destroy();
      });
    
      test("Deve dar erro por tamanho de userID ser diferente de 36", async() => {
        const response = await supertest(app).delete("/user/:userId/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34")
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: "Usuário não encontrado" })
      });

      test("Deve dar erro por tamanho de taskID ser diferente de 36", async() => {
        const response = await supertest(app).delete("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/:id")
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: "Recado não encontrado" })
      });
})

describe("testa a rota PUT - '/user/:userId/tasks/:id/archived'", () => {
    beforeAll(async () => {
        await dataSource.initialize();
        RedisConnection.connect();
      });
    
      afterAll(async () => {
        await dataSource.destroy();
        RedisConnection.destroy();
      });
    
      test("Deve dar erro por tamanho de userID ser diferente de 36", async() => {
        const response = await supertest(app).put("/user/:userId/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34/archived")
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: "Usuário não encontrado" })
      });

      test("Deve dar erro por tamanho de taskID ser diferente de 36", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/:id/archived")
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ error: "Recado não encontrado" })
      });

      test("Deve dar erro ao receber o status do archived inválido", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34/archived").send({archived: undefined})
        
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ error: "Falha ao receber o status do archived" })
      });

      test("Deve retornar 200", async() => {
        const response = await supertest(app).put("/user/49c21f0b-8e5c-4fbd-b55e-c8fb93fec947/tasks/513f4523-4c42-49d4-ad07-0e93ba951c34/archived").send({archived: true})
        
        expect(response.status).toBe(200)
      });
})