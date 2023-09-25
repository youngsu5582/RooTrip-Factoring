import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendVertificationEmailDomainEvent } from '../domain/events/send-vertification-email.domain-event';
import { ClientKafka } from '@nestjs/microservices';
@Injectable()
export class SendVertificationEmailEventListener {
  constructor(@Inject('KAFKA') private readonly producer: ClientKafka) {
    //this.producer = kafka.producer();
  }
  @OnEvent(SendVertificationEmailDomainEvent.name)
  handleUserCreatedEvent(event: SendVertificationEmailDomainEvent) {
    this.producer.send('send.vertification.email', event.email);

    //    this.producer.send({topic:"send.vertification.email",messages:[{value:event.email}]})
  }
}
