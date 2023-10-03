import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendVertificationEmailDomainEvent } from '../domain/events/send-vertification-email.domain-event';
import { SEND_VERTIFICATION_EMAIL } from '../user.di-token';
import { Producer } from 'kafkajs';
import { PRODUCER } from '@src/providers/kafka/kafka.di-token';
SEND_VERTIFICATION_EMAIL;
@Injectable()
export class SendVertificationEmailEventListener {
  constructor(@Inject(PRODUCER) private readonly producer: Producer) {}
  @OnEvent(SendVertificationEmailDomainEvent.name)
  handleSendVertificationEmailEvent(event: SendVertificationEmailDomainEvent) {
    const result = this.producer.send({
      messages: [
        {
          value: JSON.stringify({
            email: event.email,
            code: event.redirectCode,
            nickname: event.nickname,
          }),
        },
      ],
      topic: SEND_VERTIFICATION_EMAIL,
      acks: 1,
    });
    result.then((data) => data);
    result.catch((err) => err);
  }
}
