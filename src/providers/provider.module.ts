import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'RooTripClient',
            brokers: ['localhost:9094'],
          },
          producer: {},
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RedisProvider],
  exports: [RedisProvider, ClientsModule],
})
export class ProviderModule {}
