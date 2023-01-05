    type TDataCache = {
        [key: string]: any;
    }

    class RedisCacheMock {
        cache: TDataCache;
    
        constructor () {
        this.cache = {};
        }
    
        public async get<T>(key: string): Promise<T | null> {
            const result = await this.cache.get(key);
            if (!result) return null;
            return JSON.parse(result);
        }
        
        public async set(key: string, value: any) {
            await this.cache.set(key, JSON.stringify(value));
        }
    
        public async delete(key: string) {
            await this.cache.del(key);
        }
    }
  
  export { RedisCacheMock };