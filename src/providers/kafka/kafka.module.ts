import { Module } from '@nestjs/common';
import { Consumer } from './consumer.provider';
import { Producer } from './producer.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [Consumer, Producer],
  exports: [Consumer, Producer],
})
export class KafkaModule {}
