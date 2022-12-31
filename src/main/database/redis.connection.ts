import Redis from "ioredis";
import envsConfig from "../env/envs-config";

export class RedisConnection {
    private static _connection: Redis;
    public static async connect() {
        if (!this._connection) {
            this._connection = new Redis(envsConfig.REDIS_URL as string);
        }

        console.log("Redis is connected.");
    }

    public static get connection() {
        if (!this._connection) {
            throw new Error("Redis is not connected.");
        }
        return this._connection;
    }
}