import { Module } from '@nestjs/common';
import { RedisProvider } from './redis/redis.provider';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [],
  providers: [RedisProvider],
  exports: [RedisProvider, KafkaModule],
})
export class ProviderModule {}
