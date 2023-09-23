import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedDomainEvent } from '../domain/events/user-created.domain-event';

@Injectable()
export class UserCreatedListener {
  @OnEvent(UserCreatedDomainEvent.name)
  handleUserCreatedEvent(event: UserCreatedDomainEvent) {
    event;
  }
}
