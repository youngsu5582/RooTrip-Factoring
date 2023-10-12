import typia from 'typia';
import { SendVertificationEmailDomainEvent } from '../../domain/events/send-vertification-email.domain-event';
import { SendVertificationEmailEventListener } from '../../listeners/send-vertification-email.event-listener';
import { DomainEventProps } from '@src/libs/ddd/domain-event-base';
import { Test, TestingModule } from '@nestjs/testing';
import { Producer, RecordMetadata } from 'kafkajs';
import { PRODUCER } from '@src/providers/kafka/kafka.di-token';
import { ProviderModule } from '@src/providers/provider.module';
import { SEND_VERTIFICATION_EMAIL } from '../../user.di-token';

describe('SendVertificationEmailEventListener', () => {
  let listener: SendVertificationEmailEventListener;
  let event: SendVertificationEmailDomainEvent;
  let producer: Producer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProviderModule],
      providers: [
        {
          provide: 'PRODUCER',
          useValue: {
            send: jest.fn(),
          },
        },
        SendVertificationEmailEventListener,
      ],
    }).compile();
    producer = module.get<Producer>(PRODUCER);
    await producer.connect();
    listener = module.get<SendVertificationEmailEventListener>(
      SendVertificationEmailEventListener,
    );
    event = new SendVertificationEmailDomainEvent(
      typia.random<DomainEventProps<SendVertificationEmailDomainEvent>>(),
    );
  });
  afterAll(async () => {
    await producer.disconnect();
  });
  it('should validate event', () => {
    expect(event).toBeInstanceOf(SendVertificationEmailDomainEvent);
  });

  it('should send a verification email', async () => {
    const expectedMessage = {
      email: event.email,
      code: event.redirectCode,
      nickname: event.nickname,
    };
    const expectedResult: RecordMetadata[] = [
      {
        errorCode: 10,
        partition: 1,
        topicName: SEND_VERTIFICATION_EMAIL,
      },
    ];
    jest.spyOn(producer, 'send').mockResolvedValue(expectedResult);
    listener.handleSendVertificationEmailEvent(event);
    expect(producer.send).toHaveBeenCalledWith({
      messages: [
        {
          value: JSON.stringify(expectedMessage),
        },
      ],
      topic: SEND_VERTIFICATION_EMAIL,
      acks: 1,
    });
  });
});
