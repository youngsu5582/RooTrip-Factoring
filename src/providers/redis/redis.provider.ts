import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisProvider {
  private readonly client: Redis;
  constructor() {
    this.client = new Redis({});
  }
  async saveData(key: string, data: any, expiration = 1800) {
    await this.client.setex(key, expiration, data);
    return;
  }
  async getData(key: string) {
    return await this.client.get(key);
  }
  async getDataWithJson<T>(key: string): Promise<T> {
    return await this.client
      .get(key)
      .then((data) => (data ? JSON.parse(data) : null));
  }
  async delData(key: string) {
    return await this.client.del(key);
  }
}
