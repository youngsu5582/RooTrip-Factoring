import { Kafka } from 'kafkajs';
import { PRODUCER } from './kafka.di-token';

export const Producer = {
  provide: PRODUCER,
  useFactory: () => {
    const producer = new Kafka({
      clientId: 'RooTripClient',
      brokers: ['localhost:9094'],
      logLevel: 0,
    }).producer({
      retry: { retries: 3, initialRetryTime: 1000, multiplier: 1.5 },
    });
    return producer;
  },
};
