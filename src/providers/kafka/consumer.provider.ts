import { Kafka } from 'kafkajs';
import { CONSUMER } from './kafka.di-token';

export const Consumer = {
  provide: CONSUMER,
  useFactory: () => {
    const producer = new Kafka({
      clientId: 'RooTripClient',
      brokers: ['localhost:9094'],
    }).consumer({ groupId: 'nestjs-group-server' });
    producer.connect();
    return producer;
  },
};
