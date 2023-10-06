import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SaveTemporalRegisterDataDomainEvent } from '../domain/events/save-temporal-register-data.domain-event';
import { RedisProvider } from '@src/providers/redis.provider';

@Injectable()
export class SaveTemporalRegisterDataEventListener {
  private readonly logger = new Logger(
    SaveTemporalRegisterDataDomainEvent.name,
  );
  constructor(private readonly redis: RedisProvider) {}
  @OnEvent(SaveTemporalRegisterDataDomainEvent.name)
  handleSaveTemporalRegisterDataEvent(
    event: SaveTemporalRegisterDataDomainEvent,
  ) {
    const key = `temporalRegister : ${event.key}`;
    this.redis.saveData(key, JSON.stringify(event.data));
  }
}
