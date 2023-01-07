import dataSource from '../../../../src/main/database/database-connection'
import app from '../../../../src/main/config/app'
import { RedisConnection } from "../../../../src/main/database/redis.connection"
import supertest from 'supertest';

jest.mock("ioredis", () => require("ioredis-mock"));

describe("testa a rota POST - '/user'", () => {
    beforeAll(async () => {
        await dataSource.initialize();
        RedisConnection.connect();
      });
    
      afterAll(async () => {
        await dataSource.destroy();
        RedisConnection.destroy();
      });
    
    test("Deve dar erro por não passar name", async() => {
      const response = await supertest(app).post("/user").send({name: ""})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "O campo name é obrigatório"})
    });

    test("Deve dar erro por não passar password", async() => {
      const response = await supertest(app).post("/user").send({name: "name"})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "O campo password é obrigatório"})
    });

    test("Deve dar erro por não passar repeatPassword", async() => {
      const response = await supertest(app).post("/user").send({name: "name", password: "password"})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "O campo confirm password é obrigatório"})
    });

    test("Deve dar erro por passar nome inferior a três caracteres", async() => {
      const response = await supertest(app).post("/user").send({name: "na", password: "password", repeatPassword: "repeatPassword"})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "O tamanho do nome não pode ser inferior a três caracteres"})
    });

    test("Deve dar erro por campos de senhas diferentes", async() => {
      const response = await supertest(app).post("/user").send({name: "name", password: "password", repeatPassword: "repeatPassword"})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "Campos de senhas devem ser iguais"})
    });
    
    test("Deve dar erro por campos de senhas diferentes", async() => {
      const response = await supertest(app).post("/user").send({name: "name", password: "password", repeatPassword: "repeatPassword"})
      
      expect(response.status).toBe(400)
      expect(response.body).toEqual({error: "Campos de senhas devem ser iguais"})
    });

    test("Deve retornar 201", async() => {
      const randomName = String(Date.now()) //sim, eu sei, é um RTA dos mais chinelo
      const response = await supertest(app).post("/user").send({name: randomName, password: "password", repeatPassword: "password"})
      
      expect(response.status).toBe(201)
    });    
})


describe("testa a rota POST - '/user/login'", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    RedisConnection.connect();
  });

  afterAll(async () => {
    await dataSource.destroy();
    RedisConnection.destroy();
  });

  test("Deve dar erro por não passar name", async() => {
    const response = await supertest(app).post("/user/login").send({name: ""})
    
    expect(response.status).toBe(400)
    expect(response.body).toEqual({error: "O campo name é obrigatório"})
  });

  test("Deve dar erro por não passar password", async() => {
    const response = await supertest(app).post("/user/login").send({name: "name"})
    
    expect(response.status).toBe(400)
    expect(response.body).toEqual({error: "O campo password é obrigatório"})
  });

  test("Deve retorna 200", async () => {
    const response = await supertest(app).post("/user/login").send({name: "name", password: "password"}) 
    
    expect(response.status).toBe(200)
  })

  test("Deve retorna 400 e dar erro de usuario não encontrado", async () => {
    const response = await supertest(app).post("/user/login").send({name: "nameNotExist", password: "nameNotExist"}) 
    
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Usuario não encontrado', stack: {} })
  })
})
