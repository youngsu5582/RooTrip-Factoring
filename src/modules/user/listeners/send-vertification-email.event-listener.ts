import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendVertificationEmailDomainEvent } from '../domain/events/send-vertification-email.domain-event';

@Injectable()
export class SendVertificationEmailEventListener {
  @OnEvent(SendVertificationEmailDomainEvent.name)
  handleUserCreatedEvent(event: SendVertificationEmailDomainEvent) {
    event;
  }
}
