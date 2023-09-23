import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SaveTemporalRegisterDataDomainEvent } from '../domain/events/save-temporal-register-data.domain-event';

@Injectable()
export class SaveTemporalRegisterDataEventListener {
  @OnEvent(SaveTemporalRegisterDataDomainEvent.name)
  handleUserCreatedEvent(event: SaveTemporalRegisterDataDomainEvent) {
    event;
  }
}
