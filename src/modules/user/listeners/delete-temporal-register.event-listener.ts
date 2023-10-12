import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RedisProvider } from '@src/providers/redis/redis.provider';
import { DeleteTemporalRegisterDataDomainEvent } from '../domain/events/delete-temporal-register-data.domain-event';

@Injectable()
export class DeleteTemporalRegisterDataEventListener {
  constructor(private readonly redis: RedisProvider) {}
  @OnEvent(DeleteTemporalRegisterDataDomainEvent.name)
  handleSaveTemporalRegisterDataEvent(
    event: DeleteTemporalRegisterDataDomainEvent,
  ) {
    const result = this.redis.delData(event.key);
    result.then((data) => data);
    result.catch((err) => err);
  }
}
